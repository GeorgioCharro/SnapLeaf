import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import ExpertQuestionItem from '../components/ExpertQuestionItem';

function ExpertQuestionPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'expertDiagnose'));
        const questionsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsList);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expert Diagnosis Questions</h1>
      <ul>
        {questions.map((question) => (
          <ExpertQuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </div>
  );
}

export default ExpertQuestionPage;
