import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './page/Login/Login.jsx';
import useToken from './components/hooks/useToken.js'
import Home from './page/Home/Home.jsx';
function App() {

  const { token, setToken, removeToken } = useToken()

  return (
    // <BrowserRouter>
    //     {!token && token!=="" && token!== undefined?
    //     <Login setToken={setToken}/>
    //     :(
    //       <>
    //         <Routes>
    //           <Route exact path="/home" element={<Home token={token} removeToken={removeToken}/>}></Route>
    //         </Routes>
    //       </>
    //     )}
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/home" element={<Home token={token} removeToken={removeToken} />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App
