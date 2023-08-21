/* eslint-disable react/prop-types */
// src/components/EditItem.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem(id));
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [editedMember, setEditedMember] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/members/${id}`) // Fetch the specific member by ID
      .then((res) => {
        const memberData = res.data;
        setEditedMember(memberData);
        setImage(memberData.image);
        setName(memberData.name);
        setJob(memberData.job);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    // const memberIdToDelete = editedMember[index].id;

    try {
      const updatedMember = {
        image,
        name,
        job,
      };

      await axios.put(`http://localhost:5000/members/${id}`, updatedMember);

      // Update the editedMember state
      setEditedMember({
        ...editedMember,
        image,
        name,
        job,
      });

      // Navigate back to the home page
      navigate('/');
    } catch (error) {
      console.error('Error editing member:', error);
    }
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
    <div>
      <form className="add-form " onSubmit={handleEdit}>
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
            {image && (
              <img className="Member-Uploaded-Img" src={image} alt="" />
            )}
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
              onChange={handleImageUpload}
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

        <button type="submit" className="center-button">
          Edit Member
        </button>
      </form>
    </div>
  );
};

export default EditItem;
