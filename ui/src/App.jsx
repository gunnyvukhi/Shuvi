import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './page/Login/Login.jsx';
import useToken from './components/hooks/useToken.js'
import Home from './page/Home/Home.jsx';
function App() {

  const { saveTokens, accessToken, refreshToken, refreshTokenExpiry, handleAccessTokenExpired, removeTokens } = useToken()

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (!refreshTokenExpiry || refreshTokenExpiry === "" || refreshTokenExpiry === undefined || parseInt(refreshTokenExpiry) < currentTime) {
      removeTokens();
    }
  }, [refreshTokenExpiry, removeTokens])

  return (
    <BrowserRouter>
      <Routes>
        {!refreshToken || refreshToken === "" || refreshToken === undefined ? (
          <Route
            path="/"
            element={<Login setTokens={saveTokens} />}
          />
        ) : (
            <Route
              exact
              path="/"
              element={<Home accessToken={accessToken} handleAccessTokenExpired={handleAccessTokenExpired} removeTokens={removeTokens}/>}
            />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App
