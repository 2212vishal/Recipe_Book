import React from 'react';

function Instruction({ instructions, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="flex flex-col w-10/12 justify-center items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white border rounded p-5">
      <div className='flex justify-between items-baseline p-2'>
        <h3 className='mr-2 text-2xl items-center'>Instruction</h3>
        <div className='items-center'>
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

      <div className="mt-5 max-h-60 overflow-y-auto">
        <p className="text-lg" dangerouslySetInnerHTML={{ __html: instructions }}></p>
      </div>
    </div>
  );
}

export default Instruction;
