import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingForm = ({ rat, setRat, onClose }) => {
  return (
    <div className="bg-white p-4 rounded-lg ">
      <p>Rate this recipe:</p>
      <div className='flex gap-2'>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-yellow-500 cursor-pointer ${index < rat ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => setRat(index + 1)}
          />
        ))}
      </div>
      <button onClick={onClose} className="bg-gray-700 text-white px-3 py-1 mt-2 rounded-md">
        Close
      </button>
    </div>
  );
};

export default RatingForm;
