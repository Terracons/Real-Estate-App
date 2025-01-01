import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"



export default function SignIn() {
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
      const res = await fetch("/api/auth/signin", {
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
      navigate("a/")
    
        
      } catch (error) {
        setLoading(false)
        setError(data.message || 'An error occurred during sign in')

        
      }}
      
  return (
    <div className='mx-auto p-3 max-w-lg'>
      <h1 className='font-bold text-4xl  flex  justify-center m-4'>Sign In</h1>
      <form action="" onSubmit={handleSubmit}  className='flex flex-col gap-3'>
            <input type="email"  placeholder='email' id="email" className='border rounded-lg p-3'onChange={handleform}/>
            <input type="password"  placeholder='password' id='password' className='border rounded-lg p-3'onChange={handleform}/>
            <button disabled= {loading} className='max-w-lg bg-slate-700 p-3 rounded-lg border text-white hover:opacity-95 disabled:opacity-80'>{loading? "Loading" :"Sign In" }</button>
      </form>
      <h3 className='flex gap-2 my-2'>
        <span>Don't have an account?</span>
        <Link to="/sign-up">
        <span className='text-slate-600'>Sign up</span>
        </Link>
        
      </h3>
      {error && <p className='text-red-500 mt-5'> {error}</p>}

    </div>
  )
}
