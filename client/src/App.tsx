import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation/Navigation'
import GuardedRoute from './components/CustomRoutes/GuardedRoute'
import AuthGuardedRoute from './components/CustomRoutes/AuthGuardedRoute'
import EditProfile from './pages/EditProfile/EditProfile'
import Artists from './pages/Artists/Artists'
import Artist from './pages/Artist/Artist'
import Checkout from './pages/Checkout/Checkout'
import EditSoundtrack from './pages/EditSoundtrack/EditSoundtrack'
import { useAuthentication } from './hooks/useAuthentication'

function App() {

  const { syncUser } = useAuthentication();

  useEffect(() => {
    syncUser()
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
          <Route path='/soundtrack/edit/:id?' element={<AuthGuardedRoute element={EditSoundtrack} />} />
          <Route path='/checkout' element={<AuthGuardedRoute element={Checkout} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App 