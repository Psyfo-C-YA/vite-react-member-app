import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
import '../css/Member.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import EditMember from './EditMember';

const Member = ({ members, onDeleteMember, setEditingMember }) => {
  // useEffect(() => {
  //   // Populate the state with the existing member's data when component mounts
  //   if (memberToEdit) {
  //     setName(memberToEdit.name);
  //     setJob(memberToEdit.job);
  //     setSelectedImage(memberToEdit.selectedImage);
  //   }
  // }, [memberToEdit]);

  return (
    <div>
      <ul>
        {members.map((item) => (
          <li key={item.id} className={'Member__Container'}>
            <img
              className="Member__Img"
              src={item.selectedImage}
              alt="Selected"
            />
            <div className="Member__Text">
              <p> {item.name}</p>
              <p> {item.job}</p>
            </div>
            <div className="Member__Icons">
              <i className="Member__Icon">
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={() => {
                    setEditingMember(item); // onEditMember(item.id);
                  }}
                />
              </i>
              <i className="Member__Icon">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => onDeleteMember(item.id)}
                />
              </i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Member.defaultProps = {
  name: 'Psyfo Hadebe',
  job: 'Software Dev',
};

Member.propTypes = {
  // name: PropTypes.string,
  // job: PropTypes.string,
  members: PropTypes.array,
  onDeleteMember: PropTypes.func,
  setEditingMember: PropTypes.func,
  map: PropTypes.func,
};

export default Member;
