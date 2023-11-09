import React, { useState } from 'react';

function EditCategoryModal({ isOpen, onClose, onSave }) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSave = () => {
    // Call the API to update the category with newCategoryName
    // If the API request is successful, call onSave and close the modal
    // If there's an error, handle it accordingly
    // For this example, I'll just log the new category name
    console.log('New category name:', newCategoryName);

    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-box">
        <h2>Edit Category</h2>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditCategoryModal;
