import { useState } from 'react';
import axios from 'axios';
function useToken() {

  function getAccessToken() {
    return sessionStorage.getItem('shuvi_access_token');
  }

  function getRefreshToken() {
    return localStorage.getItem('shuvi_refresh_token');
  }

  function getAccessTokenExpiry() {
    return sessionStorage.getItem('shuvi_access_token_expiry');
  }

  function getRefreshTokenExpiry() {
    return localStorage.getItem('shuvi_refresh_token_expiry');
  }

  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(getAccessTokenExpiry());
  const [refreshTokenExpiry, setRefreshTokenExpiry] = useState(getRefreshTokenExpiry());

  function saveTokens({ accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry }) {
    if (accessToken !== undefined && accessToken !== null) {
      sessionStorage.setItem('shuvi_access_token', accessToken);
      setAccessToken(accessToken);
    }
    if (refreshToken !== undefined && refreshToken !== null) {
      localStorage.setItem('shuvi_refresh_token', refreshToken);
      setRefreshToken(refreshToken);
    }
    if (accessTokenExpiry !== undefined && accessTokenExpiry !== null) {
      sessionStorage.setItem('shuvi_access_token_expiry', accessTokenExpiry);
      setAccessTokenExpiry(accessTokenExpiry);
    }
    if (refreshTokenExpiry !== undefined && refreshTokenExpiry !== null) {
      localStorage.setItem('shuvi_refresh_token_expiry', refreshTokenExpiry);
      setRefreshTokenExpiry(refreshTokenExpiry);
    }
  }
  
  const fetchNewAccessToken = async () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/token/refresh/",
      data: {
        "refresh": refreshToken,
      }
    }).then((response) => {
      saveTokens({accessToken : response.data.access, accessTokenExpiry : Math.floor(Date.now() / 1000)+ 180 * 60});
      return true;
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      return false;
    })
  };

  function handleAccessTokenExpired() {
    const currentTime = Math.floor(Date.now() / 1000);
    if (
      !accessToken || accessToken === "" || accessToken === undefined ||
      !accessTokenExpiry || accessTokenExpiry === "" || accessTokenExpiry === undefined ||
      parseInt(accessTokenExpiry) < currentTime
    ) {
      const fetchNewAccessTokenResult = fetchNewAccessToken();
      if (!fetchNewAccessTokenResult) {
        removeTokens();
      }
    }
  }

  function removeTokens() {
    localStorage.removeItem('shuvi_access_token');
    localStorage.removeItem('shuvi_refresh_token');
    localStorage.removeItem('shuvi_access_token_expiry');
    localStorage.removeItem('shuvi_refresh_token_expiry');
    setAccessToken(null);
    setRefreshToken(null);
    setAccessTokenExpiry(null);
    setRefreshTokenExpiry(null);
  }

  return {
    saveTokens,
    accessToken,
    refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
    handleAccessTokenExpired,
    removeTokens
  };
}

export default useToken;