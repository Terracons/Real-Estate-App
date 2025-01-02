import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth"
import {app} from "../firebase.js"
import {  useDispatch } from 'react-redux'
import { SignInSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

export default function Outh() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleAuth = async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup (auth, provider)
            const res = await fetch("api/auth/google",{
                method:"POST",
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({name: result.user.displayName, email:result.user.email, photo:result.user.photoURL})
            })
            const data = await res.json()
            console.log(data)
            dispatch(SignInSuccess(data))
            navigate("/")
            

        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <button onClick={handleGoogleAuth} type="button" className='bg-red-700 p-3 text-white rounded-lg hover:opacity-90 max-w-6xl'> Continue With Google</button>
  )
}
