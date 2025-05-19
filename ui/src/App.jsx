import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Login, Home, Exercise, Nutrition } from './page/Page.js';
import { keepTheme } from './components/utils/themes.js';
import PrivateRoute from './components/utils/PrivateRoute/PrivateRoute.jsx';

function App() {
  useEffect(() => {
    keepTheme();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/login"
          element={<Login/>}
        />
        <Route path="/apps" element={<PrivateRoute />} >
          <Route exact path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
