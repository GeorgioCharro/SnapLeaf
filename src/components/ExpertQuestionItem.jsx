import React from 'react';
import { Link } from 'react-router-dom';

function ExpertQuestionItem({ question }) {
  return (
    <li className="flex justify-between items-center mb-4">
      <Link to={`/expert-questions/${question.id}`} className="w-full">
        <div className="card card-side bg-base-100 shadow-xl pl-4 w-full">
          
          <div className="card-body flex flex-col justify-center">
            <h3 className="card-title mb-0">{question.plantType}</h3>
            <p>{question.plantAge}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ExpertQuestionItem;
