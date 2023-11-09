import React, { useState } from 'react';

const EditCategoryModal = ({ isOpen, onRequestClose, initialCategoryName, onSave }) => {
  const [categoryName, setCategoryName] = useState(initialCategoryName);

  const handleSave = () => {
    onSave(categoryName);
    onRequestClose();
  };

  return (
    <div className={`modal fixed ${isOpen ? 'block' : 'hidden'} inset-0 flex items-center justify-center z-50`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-header">
          <h2 className="text-2xl text-gray-800 font-semibold">Edit Category</h2>
        </div>
        <div className="modal-body p-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="modal-footer p-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
