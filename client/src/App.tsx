import React from 'react'
import Navigation from './Navigation/Navigation'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Footer from './Footer/Footer'
import Login from './Login/Login'
import Register from './Register/Register'

function App() {
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