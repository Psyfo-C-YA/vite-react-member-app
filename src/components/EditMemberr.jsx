import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function EditMemberr({ editingMember, handleEdit }) {
  const [editedMember, setEditedMember] = useState(editingMember);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleInputChangeJob = (event) => {
    const { name, value } = event.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      job: value,
    }));
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setEditedMember((prevMember) => ({
        ...prevMember,
        selectedImage: e.target.result,
      }));
    };

    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit(editedMember);
  };

  return (
    <div className="add-form ">
      <div className="form-control-img">
        <div className="Member-Upload__Img">
          <FontAwesomeIcon className="Member__Img-icon" icon={faImage} />
          {editedMember.selectedImage && (
            <img
              className="Member-Uploaded-Img"
              src={editedMember.selectedImage}
              alt="Uploaded"
            />
          )}
        </div>
        <div className="Member__AddImage-Box">
          <FontAwesomeIcon icon={faPlus} className="Member-Upload__Img__icon" />
          <input
            className="Member_Choose-File-Input"
            type="file"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Full Names"
          value={editedMember.name}
          onChange={handleInputChange}
          name="name"
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={editedMember.job}
          onChange={handleInputChangeJob}
          name="job"
        />
      </div>

      <button type="button" className="center-button" onClick={handleSubmit}>
        Edit Member
      </button>
    </div>
  );
}

EditMemberr.propTypes = {
  handleEdit: PropTypes.func,
  editingMember: PropTypes.object,
};

export default EditMemberr;
