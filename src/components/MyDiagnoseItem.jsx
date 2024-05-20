
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function MyDiagnoseItem({ diagnose }) {
  return (
    <li className="flex justify-between items-center mb-4 relative">
      <Link to={`/my-plants/${diagnose.id}`} className="w-full">
        <div className="card card-side bg-base-100 shadow-xl pl-4 w-full">
          <figure><img className="w-full h-24 object-cover rounded-lg" src={diagnose.imgUrls[0]} alt="Plant" /></figure>
          <div className="card-body flex flex-col justify-center">
            <h3 className="card-title mb-0">{diagnose.Plant_Name}</h3>
            <p>Diagnosis Details...</p>
            <ChevronRightIcon className="h-6 w-6 absolute top-1/2 right-4 -mt-3 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default MyDiagnoseItem;

