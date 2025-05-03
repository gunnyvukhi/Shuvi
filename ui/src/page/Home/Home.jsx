import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import SideBar from '../../components/layout/SideBar/SiderBar';

const Home = ({accessToken, handleAccessTokenExpired, removeTokens}) => {

  const [data, setData] = useState({});

  useEffect(() => {
    handleAccessTokenExpired();
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/users/profile/",
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        setData(response.data);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [accessToken, handleAccessTokenExpired]);
  console.log(data);
  return (
    data && data !== null && data !== undefined ? (
      <div className="app-container">
        <SideBar selected={1} data={data} removeTokens={removeTokens} />
      </div>
    ) : (
      <div className="app-container">
        <h1>Loading...</h1>
      </div>
    )
  );
}

Home.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Home;