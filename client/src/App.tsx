import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import './App.css'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { authState, userState } from './atoms/auth'
import Navigation from './components/Navigation/Navigation'
import { decryptCookie, deleteCookie, encryptCookie } from './utils/utils'
import GuardedRoute from './components/CustomRoutes/GuardedRoute'
import AuthGuardedRoute from './components/CustomRoutes/AuthGuardedRoute'
import EditProfile from './pages/EditProfile/EditProfile'
import Artists from './pages/Artists/Artists'
import Artist from './pages/Artist/Artist'

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
          <Route path='/profile/edit' element={<AuthGuardedRoute element={EditProfile} />} />
          <Route path='/login' element={<GuardedRoute element={Login} />} />
          <Route path='/register' element={<GuardedRoute element={Register} />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artists/:id' element={<Artist />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App 