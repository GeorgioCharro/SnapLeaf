import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import MyDiagnoseItem from '../components/MyDiagnoseItem';

function MyDiagnose() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'diagnoseResponse'), where('userRef', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const diagnosesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDiagnoses(diagnosesData);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchDiagnoses();
      } else {
        // Handle user not logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Diagnoses</h1>
      <ul>
        {diagnoses.map((diagnose) => (
          <MyDiagnoseItem key={diagnose.id} diagnose={diagnose} />
        ))}
      </ul>
    </div>
  );
}

export default MyDiagnose;
