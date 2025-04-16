import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import SideBar from '../../components/layout/SideBar/SiderBar';

const Home = ({ removeToken, token }) => {

  Home.propTypes = {
    removeToken: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  const [data, setData] = useState({})

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/get",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setData(response.data)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }, [token]);

  return (
    <div className="app-container">
      <SideBar selected={1}/>

    </div>
  );
}

export default Home;