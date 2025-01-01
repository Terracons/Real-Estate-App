import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import SignIn from './Pages/Signin'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './components/Header'

export default function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    <Routes>
      <Route path='/Sign-in' element={<SignIn/>}/>
    </Routes>
    <Routes>
      <Route path='/Sign-up' element={<SignUp/>}/>
    </Routes>
    <Routes>
      <Route path='/about' element={<About/>}/>
    </Routes>
    <Routes>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    
    </BrowserRouter>
  
  )
}

