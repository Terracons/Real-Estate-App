import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import SignIn from './Pages/Signin'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'


export default function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Sign-in' element={<SignIn/>}/>
      <Route path='/Sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/></Route>
    </Routes>
    
    </BrowserRouter>
  
  )
}

