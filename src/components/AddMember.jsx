import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/AddMember.css';
import Button from './Button';
// import ImageUpload from './ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddMember = ({ setMembers }) => {
  // const [picture, setPicture] = useState();
  const [name, setFullNames] = useState('');
  const [job, setJobTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/members')
      .then((res) => {
        setMembers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please add a member');
      return;
    }

    if (!job) {
      alert('Please add a job title');
      return;
    }

    if (!selectedImage) {
      alert('Please add an image');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/members', {
        name: name,
        job: job,
        selectedImage: selectedImage,
      });

      console.log('Data added:', res.data);
      // onAdd({ name, job, selectedImage });
      setFullNames('');
      setJobTitle('');
      setSelectedImage(null);
      window.location.reload();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <form className="add-form " onSubmit={onSubmit}>
      <div className="form-control-img">
        <div className="Member-Upload__Img">
          <FontAwesomeIcon className="Member__Img-icon" icon={faImage} />
          {selectedImage && (
            <img
              className="Member-Uploaded-Img"
              src={selectedImage}
              alt="Uploaded"
            />
          )}
        </div>
        <div className="Member__AddImage-Box">
          <FontAwesomeIcon icon={faPlus} className="Member-Upload__Img__icon" />
          <input
            className="Member_Choose-File-Input"
            type="file"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Full Names"
          value={name}
          onChange={(e) => setFullNames(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <Button type="submit" className="center-button" />
    </form>
  );
};

AddMember.propTypes = {
  onAdd: PropTypes.func,
  setMembers: PropTypes.func,
};

export default AddMember;
