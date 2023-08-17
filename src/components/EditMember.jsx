/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';

function EditMember({ editingMember, onSave }) {
  const [editedData, setEditedData] = useState({
    // id: editingMember.id,
    image: editingMember?.image || '',
    name: editingMember?.name || '',
    job: editingMember?.job || '',
  });

  const handleInputChange = (event) => {
    const { name, value, job } = event.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
      [job]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming you're using FormData to handle file uploads
      const formData = new FormData();
      formData.append('image', file);
      // Add other data to the FormData if needed
      setEditedData((prevData) => ({
        ...prevData,
        image: formData,
      }));
    }
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="add-form ">
      <input type="file" name="image" onChange={handleImageChange} />
      <input
        type="text"
        name="name"
        value={editedData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="job"
        value={editedData.job}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

EditMember.prototype = {
  //   editingMember: PropTypes.object,
  //   onSave: PropTypes.func,
  //   id: PropTypes.number,
};

export default EditMember;
