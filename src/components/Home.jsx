// src/components/Home.js
import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import '../css/App.css';
import '../css/index.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  // const history = useHistory();
  const navigate = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:5000/members')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = async (index) => {
    try {
      const memberIdToDelete = data[index].id;

      // Send a DELETE request to the server to delete the member
      await axios.delete(`http://localhost:5000/members/${memberIdToDelete}`);

      // If the deletion was successful on the server, update the local state
      const updatedMembers = data.filter(
        (member) => member.id !== memberIdToDelete
      );
      setData(updatedMembers);

      alert('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="container">
      <button className="AddMember__Btn" onClick={() => navigate('/add')}>
        Add Member
      </button>
      <div>
        <ul>
          {data.map((item, id) => (
            <li key={id} className={'Member__Container'}>
              <img className="Member__Img" src={item.image} alt={item.name} />
              <div className="Member__Text">
                <p> {item.name}</p>
                <p> {item.job}</p>
              </div>
              <div className="Member__Icons">
                <FontAwesomeIcon
                  icon={faPencil}
                  size="lg"
                  className="Member__Icon"
                  onClick={() => navigate(`/edit/${id + 1}`)}
                />

                <FontAwesomeIcon
                  icon={faTrashCan}
                  size="lg"
                  className="Member__Icon"
                  onClick={() => {
                    handleDelete(id);
                    // window.location.reload();
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
