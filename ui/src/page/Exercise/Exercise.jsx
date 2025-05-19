import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Exercise.css';
import DefaultStyle from '../../components/layout/defaultStyle/defaultStyle.jsx';

const Exercise = ({accessToken, handleAccessTokenExpired, removeTokens}) => {

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
      <DefaultStyle data={data} removeTokens={removeTokens}>
        {data && data !== null && data !== undefined ? (
          <h1>loading...</h1>
        ) : (
          <h1>Exercise</h1>
        )}
      </DefaultStyle>
  );
}

Exercise.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Exercise;