import React from 'react'
import Navigation from './components/Navigation/Navigation'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

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