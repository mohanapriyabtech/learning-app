import React from 'react';

function Modal({ isOpen, onClose, message }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>{message}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
