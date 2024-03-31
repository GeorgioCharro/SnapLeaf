import React from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/svg/leftArrow.svg'; // Ensure the path is correct

function TopBar({title}) {
  const navigate = useNavigate();

  // Function to navigate back
  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl pl-4 w-full flex items-center">
        <div className="mt-4 mb-4 flex items-center">
            <img
        src={leftArrow}
        alt="Back"
        className="cursor-pointer mr-4 h-10 w-10" // Add more styling as needed
        onClick={handleBack}
      />
      <p className="text-xl font-semibold">{title}</p>
        </div>
      
    </div>
  );
}

export default TopBar;