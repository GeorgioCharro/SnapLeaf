import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function ChatBotPage() {
  const { diagnoseId } = useParams();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDiagnose = async () => {
      if (user) {
        const docRef = doc(db, 'diagnoseResponse', diagnoseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().userRef === user.uid) {
          // You might want to do something with diagnose data here if needed in the future
          console.log('Diagnose data fetched', docSnap.data());
        } else {
          console.error('Diagnose not found or unauthorized access');
        }
      }
    };
    fetchDiagnose();
  }, [diagnoseId, user]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CHATBOT_URL}`,
        { question: message },
        {
          headers: {
            'user': user.uid,
            'x-api-key': process.env.REACT_APP_DIAGNOSE_KEY,
          },
        }
      );

      // Log the entire response to understand its structure
      console.log('Full API Response:', response);

      if (response.data) {
        console.log('Response Data:', response.data);
      } else {
        console.error('Unexpected API response format:', response);
      }

      // Adjust this part based on the actual response structure
      const botResponse = response.data.answer || response.data.message || response.data.response;
      if (botResponse) {
        setChatHistory((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      } else {
        console.error('Unexpected API response format:', response.data);
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }

    setMessage('');
  };

  return (
    <div className="container mx-auto p-4 mb-32">
      <h1 className="text-2xl font-bold mb-4">ChatBot Support</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="border rounded-lg flex-grow p-2 mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="btn btn-primary p-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBotPage;
