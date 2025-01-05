import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 className='text-4xl font-bold'>Profile</h1>
      <img className='rounded-full mx-auto my-3' src={currentUser.avatar} alt="" />
      <form action="" className='flex flex-col max-w-80 mx-auto gap-4 '>
        <input className='p-3 rounded-lg' type="text" placeholder={currentUser.username}/>
        <input className='p-3 rounded-lg'  type="email" placeholder={currentUser.email}/>
        <input className='p-3 rounded-lg'  type="password" placeholder='password'/>
        <button className='p-3 rounded-lg bg-slate-700 text-white hover:opacity-90'  >Update</button>
        <button className='p-3 rounded-lg bg-green-700 text-white hover:opacity-90'>Create Listing</button>       
      </form>
      <p className='text-red-700 flex max-w-80 mx-auto justify-between mt-3'>
        <span>Delete Account</span>
        <span>Sign Out</span>
        </p>

    </div>
  );
}
