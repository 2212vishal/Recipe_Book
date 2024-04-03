import React from 'react';

function Ingredient({ list, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="flex flex-col w-10/12 justify-center items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white border rounded p-5">
      <div className='flex justify-between items-baseline'>
        <div>
          <h3 className='mr-2 text-2xl'>Ingredient</h3>
        </div>

        <div>
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-100 border rounded"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-2 max-h-60 overflow-y-auto">
        <ul className='list-disc p-2'>
          {list.map(({ id, original }) => (
            <li key={id}>{original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ingredient;
