import React from 'react';

function TailwindModal({ isOpen, onClose, message }) {
  return (
    // Modal backdrop
    <div
      className={`${
        isOpen ? 'fixed inset-0 bg-black opacity-50' : 'hidden'
      } transition-opacity duration-300`}
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className={`${
          isOpen ? 'fixed inset-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white p-8 rounded-md' : 'hidden'
        } transition-transform duration-300`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          &times;
        </button>

        {/* Modal content */}
        <div>
          <p>{message || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
        </div>

        {/* Modal actions */}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default TailwindModal;