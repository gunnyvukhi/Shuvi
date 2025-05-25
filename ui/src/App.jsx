import { BrowserRouter, Routes, Route,Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Login, Home, Exercise, Nutrition, Welcome } from './page/Page.js';
import { keepTheme } from './components/utils/themes.js';
import useAuth from './components/hooks/useAuth.js';
function App() {
  useEffect(() => {
    keepTheme();
  }, [])
  
  function PrivateRoute() {
      const auth = useAuth();
      return auth ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<Welcome />}
        />
        <Route
          index
          path="/login"
          element={<Login/>}
        />
        <Route path="/apps" element={<PrivateRoute />} >
          <Route exact path="home" element={<Home />} />
          <Route exact path="exercise" element={<Exercise />} />
          <Route exact path="nutrition" element={<Nutrition />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
