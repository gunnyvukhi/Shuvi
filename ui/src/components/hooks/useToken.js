import { useState } from 'react';

function useToken() {

  function getAccessToken() {
    return localStorage.getItem('shuvi_access_token');
  }

  function getRefreshToken() {
    return localStorage.getItem('shuvi_refresh_token');
  }

  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  function saveTokens({ accessToken, refreshToken }) {
    if (accessToken) {
      localStorage.setItem('shuvi_access_token', accessToken);
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('shuvi_refresh_token', refreshToken);
      setRefreshToken(refreshToken);
    }
  }

  function removeTokens() {
    localStorage.removeItem('shuvi_access_token');
    localStorage.removeItem('shuvi_refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
  }

  return {
    setTokens: saveTokens,
    accessToken,
    refreshToken,
    removeTokens
  };
}

export default useToken;