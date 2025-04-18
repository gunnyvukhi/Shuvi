import React from 'react';
import './Loading.css';

const Loading = ({width, height}) => {
    return (
        <div className="loader-container">
            <span style={{ width: width, height: height }} className="loader"></span>
        </div>
    );
};

export default Loading;