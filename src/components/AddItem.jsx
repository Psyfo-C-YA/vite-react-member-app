// src/components/AddItem.js
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import '../css/App.css';
import '../css/index.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faImages,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddItem = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new item object

    // const newItem = { image, name, job };
    // localStorage.clear();
    // Update data in local storage
    // const storedData = JSON.parse(localStorage.getItem('crudData') || '[]');
    // const updatedData = [...storedData, newItem];
    // localStorage.setItem('crudData', JSON.stringify(updatedData));

    try {
      const res = await axios.post('http://localhost:5000/members', {
        name: name,
        job: job,
        image: image,
      });

      console.log('Data added:', res.data);
      // onAdd({ name, job, selectedImage });
      setName('');
      setJob('');
      setImage(null);
      // window.location.reload();
    } catch (error) {
      console.error('Error adding data:', error);
    }

    // Navigate back to the home page
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="add-form " onSubmit={handleSubmit}>
      <div className="form-control-img">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          size="lg"
          className="Member__Icon"
          onClick={() => navigate('/')}
        />

        <div className="Member-Upload__Img">
          <FontAwesomeIcon
            icon={faImages}
            size="xl"
            className="Member__Img-icon"
          />
          {image && <img className="Member-Uploaded-Img" src={image} alt="" />}
        </div>
        <div className="Member__AddImage-Box">
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            className="Member-Upload__Img__icon"
          />
          <input
            className="Member_Choose-File-Input"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Full Names"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>

      <button type="submit" className=" center-button">
        Add Member
      </button>
    </form>
  );
};

export default AddItem;
