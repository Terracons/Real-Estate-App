import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    <Routes>
      <Route path='/Sign-in' element={<Signin/>}/>
    </Routes>
    <Routes>
      <Route path='/Sign-up' element={<SignUp/>}/>
    </Routes>
    <Routes>
      <Route path='/About' element={<About/>}/>
    </Routes>
    <Routes>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    
    </BrowserRouter>
  
  )
}

