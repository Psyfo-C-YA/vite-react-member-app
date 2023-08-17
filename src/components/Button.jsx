import PropTypes from 'prop-types';
import '../css/Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      Add Member
    </button>
  );
};

Button.defaultProps = {
  text: 'Add Member',
  color: 'White',
  bgColor: '#164B60',
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
