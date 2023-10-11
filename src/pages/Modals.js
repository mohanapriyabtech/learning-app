import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';

function Modals({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
     
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> */}
        </button>
    
      <ModalBody>
        {message || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendi repudiandae voluptatem tempore!'}
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Ok</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Modals;
