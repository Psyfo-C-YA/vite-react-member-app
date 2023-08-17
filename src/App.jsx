import { useState, useEffect } from 'react';
import AddMember from './components/AddMember';
import './css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Member from './components/Member';
import axios from 'axios';
// import EditMemberr from './components/EditMember';
import EditMemberr from './components/EditMemberr';

function App() {
  const [members, setMembers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [showEditMember, setShowEditMember] = useState(false);

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

  let backBtn = true;

  let uiEditmember = true;

  //Editing
  const handleEdit = (editedMember) => {
    // Find the index of the edited member in the members array
    const editedIndex = members.findIndex(
      (member) => member.id === editedMember.id
    );

    if (editedIndex !== -1) {
      // Create a new array with the edited member data
      const updatedMembers = [...members];
      updatedMembers[editedIndex] = editedMember;

      setMembers(updatedMembers);
      setEditingMember(null);
    }
  };

  //Deleting
  const handleDeleteMember = async (memberId) => {
    try {
      // Send a DELETE request to the server to delete the member
      const response = await fetch(
        `http://localhost:5000/members/${memberId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        // Handle the error if the request was not successful
        throw new Error('Failed to delete member');
      }

      // If the deletion was successful on the server, update the local state
      const updatedMembers = members.filter((member) => member.id !== memberId);
      setMembers(updatedMembers);

      alert('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const uiInversing = () => {
    if (editingMember !== null) {
      <button id="addMemberBtn" style={{ display: 'none' }}></button>;
    }
  };

  return (
    <div className="container">
      {/* Back btn */}
      {showAddMember ? (
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            setShowEditMember(false);
            return setShowAddMember(!backBtn);
          }}
        />
      ) : (
        ''
      )}
      {/* Add Member btn */}
      {/* {showAddMember ? (
        <button id="addMemberBtn" className="btn-transperant"></button>
      ) : (
        <button
          id="addMemberBtn"
          className="Button"
          onClick={() => {
            return setShowAddMember(!showAddMember);
          }}
        >
          Add Member
        </button>
      )} */}

      {!showEditMember && (
        <button
          id="addMemberBtn"
          className="Button"
          onClick={() => {
            setShowAddMember(!showAddMember);
            return setShowEditMember(true);
          }} // Show the EditMember component
        >
          Add Member
        </button>
      )}

      {/* Add Member Form */}
      {showAddMember ? <AddMember setMembers={setMembers} /> : ''}
      {/* Edit member form  */}
      {/* {editingMember !== null ? <EditMember /> : ''} */}
      {editingMember !== null ? (
        <EditMemberr editingMember={editingMember} handleEdit={handleEdit} />
      ) : (
        ''
      )}
      {/* List of Members in db */}
      {members.length > 0 && showAddMember !== true ? (
        <Member
          members={members}
          onDeleteMember={handleDeleteMember}
          setEditingMember={setEditingMember}
        />
      ) : (
        ''
        // <p className="Member__Message">No members in database</p>
      )}
      {members.length <= 0 && !showAddMember ? (
        <p className="Member__Message">No members in database</p>
      ) : (
        ''
      )}
      {/* {uiInversing} */}
    </div>
  );
}

export default App;
