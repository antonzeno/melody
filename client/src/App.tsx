import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import './App.css'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { authState, userState } from './atoms/auth'
import Navigation from './components/Navigation/Navigation'
import { decryptCookie, deleteCookie, encryptCookie } from './utils/utils'
import GuardedRoute from './components/GuardedRoute/GuardedRoute'

function App() {

  const [auth, setAuth] = useRecoilState(authState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (!decryptCookie('sessionId')) {
      (async () => {
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
            setAuth(true);
            setUser(response.data.user);
            encryptCookie('sessionId', response.data.user)
          }
        } catch (error) {
          deleteCookie('sessionId');
        }
      })();
    } else {
      setUser(decryptCookie('sessionId'))
    }
  }, []);

  return (
    <div className='wrapper'>
      <Navigation />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<GuardedRoute element={Login} />} />
          <Route path='/register' element={<GuardedRoute element={Register} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App 