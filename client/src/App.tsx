import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import './App.css'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { userState } from './atoms/auth'
import Navigation from './components/Navigation/Navigation'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        axios.interceptors.request.use(
          (config) => {
            config.withCredentials = true;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/checkAuth`);

        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <div className='wrapper'>
      <Navigation />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App 