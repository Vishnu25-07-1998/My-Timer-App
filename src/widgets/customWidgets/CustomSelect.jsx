import './customselect.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";


const CustomSelect = ({ placeholder, selectedValue, options, onChange }) => {

  const [isDropdown, setIsDropdown] = useState(false);
    const dropRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setIsDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleDropdown = () => {
        setIsDropdown(!isDropdown);
    }
    const handleOptionSelect = (selectedValue) => {
        onChange({ target: { value: selectedValue } });
        setIsDropdown(false);
    };


  return (
    <div className='custom-select' ref={dropRef}>
      <div className="selected-box" onClick={handleDropdown}>
        <input
          type="text"
          placeholder={placeholder}
          value={selectedValue}
          readOnly
          className="selected-input"
        />
        <FontAwesomeIcon icon={faCaretDown} className={`dropdown-icon ${isDropdown ? 'active' : ''}`} />
      </div>
      {isDropdown && <ul className="option-box">
        {options.map((item, index) => (
          <li
            key={`${item}_${index}`}
            className={`custom-dropdown-list-item ${selectedValue === item ? "active" : ""}`}
            onClick={() => handleOptionSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul> }
    </div>
  )
}

CustomSelect.propTypes = {
  selectedValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CustomSelect