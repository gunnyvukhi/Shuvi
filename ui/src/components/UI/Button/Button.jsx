import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
''
const Button = ({ label, onClick, type = 'button', className = '', color='#fff', bgColor='#ff73b3', isValid=true }) => {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick} style={{ ...(isValid ? {} : { opacity: 0.5, cursor: "not-allowed" }), color: color, backgroundColor: bgColor, boxShadow: `0 0 10px 1px ${bgColor}` }}>
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    isValid: PropTypes.bool,
};

export default Button;