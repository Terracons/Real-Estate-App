import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

export default function SignUp() {
  const [formData, setformData] = useState({})
  const [error, setError]=useState(null)
  const [loading, setLoading]=useState(false)
  const navigate = useNavigate()
  const handleform =(e)=>{
    setformData({      ...formData,
      [e.target.id]: e.target.value,
    })}

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        console.log(data.message);
        return
      }
      setLoading(false)
      setError(null)
      console.log(data);
      navigate("/Sign-in")
    
        
      } catch (error) {
        setLoading(false)
        setError(data.message || 'An error occurred during signup')

        
      }}
      
  return (
    <div className='mx-auto p-3 max-w-lg'>
      <h1 className='font-bold text-4xl  flex  justify-center m-4'>Sign Up</h1>
      <form action="" onSubmit={handleSubmit}  className='flex flex-col gap-3'>
            <input type="text"  placeholder='username' id='username' className='border rounded-lg p-3' onChange={handleform}/>
            <input type="email"  placeholder='email' id="email" className='border rounded-lg p-3'onChange={handleform}/>
            <input type="password"  placeholder='password' id='password' className='border rounded-lg p-3'onChange={handleform}/>
            <button disabled= {loading} className='max-w-lg bg-slate-700 p-3 rounded-lg border text-white hover:opacity-95 disabled:opacity-80'>{loading? "Loading" :"Sign Up" }</button>
      </form>
      <h3 className='flex gap-2 my-2'>
        <span>Have an account?</span>
        <Link to="/sign-in">
        <span className='text-slate-600'>Sign in</span>
        </Link>
        
      </h3>
      {error && <p className='text-red-500 mt-5'> {error}</p>}

    </div>
  )
}
