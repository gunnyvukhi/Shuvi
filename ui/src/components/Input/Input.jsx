import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({id, name, type, placeholder, value, setValue, validate, warning }) => {
    
    if (validate === undefined) {
        validate = (value) => {return true};
    }

    const handleChange = (e) => {
        if ((touched === true)) {
            errorRef.current = validate(e.target.value);
        }
        setValue(e.target.value);
    };
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setTouched(true);
        errorRef.current = validate(e.target.value);
    }

    const errorRef = useRef(true);

    return (
        <>
        <div className="input-group" style={errorRef.current? { margin: "8px 0 16px 0"} : {'--current': "#9a0000", '--normal': "#9a0000"}}>
            <input 
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"/>
            <label className="label" style={value === "" ? {} : { transform: "translateY(-90%) scale(0.7)", backgroundColor: "#ffffff", paddingInline: "0.3em" }} htmlFor={name}>{placeholder}</label>
        </div>
        <p className='error' style={errorRef.current? {} : { margin: "0 0 16px 0"}}>{errorRef.current || warning}</p>
        </>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    validate: PropTypes.func,
    warning: PropTypes.string,
};

Input.defaultProps = {
    id: '',
    name: '',
    type: 'text',
    placeholder: 'name',
    value: null,
    setValue: () => {},
    validate: () => {},
    warning: '',
};

export default Input;