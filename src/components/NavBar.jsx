import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg';
import { ReactComponent as CameraIcon } from '../assets/svg/cameraIcon.svg';
import { ReactComponent as ProfileIcon } from '../assets/svg/profileIcon.svg';
import SchoolIcon from '@mui/icons-material/School';

function NavBar() {
  const navigate = useNavigate();
  const [isExpert, setIsExpert] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsExpert(userData.expert || false); // Set isExpert to true if the expert field is true
        }
      };

      fetchUserData();
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const fetchUserData = async () => {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setIsExpert(userData.expert || false); // Set isExpert to true if the expert field is true
            }
          };

          fetchUserData();
        }
      });
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white z-50 flex justify-center items-center">
      <div className="w-full mt-3 overflow-y-hidden">
        <ul className="list-none m-0 p-0 flex justify-evenly items-center">
          <li className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/')}>
            <HomeIcon width='36px' height='36px' />
            <p className='mt-1 text-xs font-semibold text-gray-600'>Home</p>
          </li>
          
          <li className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/diagnose')}>
            <CameraIcon width='36px' height='36px' />
            <p className='mt-1 text-xs font-semibold text-gray-600'>Camera</p>
          </li>
          <li className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/profile')}>
            <ProfileIcon width='36px' height='36px' />
            <p className='mt-1 text-xs font-semibold text-gray-600'>Profile</p>
          </li>
          {isExpert && (
            <li className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/diagnose-questions')}>
              <SchoolIcon style={{ fontSize: 36, color: 'gray' }} />
              <p className='mt-1 text-xs font-semibold text-gray-600'>Expert</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
