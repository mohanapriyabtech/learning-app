import React from 'react';
import { XIcon } from '@heroicons/react/outline';

function Modal({ isOpen, onClose, message }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <XIcon className="h-6 w-6" />
              </button>

              {/* Modal Content */}
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
