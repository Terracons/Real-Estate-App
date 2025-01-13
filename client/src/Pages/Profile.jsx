import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const upload_presets = "real_estate";
  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = useState('')
  const [forminfo, setformInfo]= useState({})

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', upload_presets);

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drawz2aoj/image/upload',
        formData
      );
      const imageUrl = res.data.secure_url;
      setUrlImage(imageUrl)
      setformInfo((prev) => ({ ...prev, avatar: imageUrl }));
      console.log('Image uploaded successfully:', imageUrl);
      setLoading(false);
    } catch (err) {
      console.error('Error uploading image: ', err);
      setLoading(false);
    }
  };

  console.log(forminfo);
  console.log(urlImage);

  const handleInput =(e)=>{
    setformInfo({avatar:urlImage,
      ...forminfo, [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

  try {
    dispatch(updateStart())
    const res= await fetch(`/api/user/update/${currentUser._id}`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(forminfo),

    })

    const data = await res.json()
    if(data.success === false)
    {dispatch(updateFailure(data.message))
    console.log(data.message);
    return;
  }
  dispatch(updateSuccess(data))


    
  } 
  catch (error) {
    dispatch(updateFailure(error.message))
    
  }

  }

  

  return (
    <div className='max-w-2xl flex flex-col mx-auto p-7'>
      <h1 className="text-4xl font-bold text-center">Profile</h1>

      <form className="flex flex-col gap-4 m" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImage}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full mx-auto my-5 h-24 w-24 object-cover cursor-pointer"
          src={urlImage || currentUser.avatar}
          alt="Profile Avatar"
          id="avatar"
        />
        {loading && <p className="text-blue-500">Image uploading...</p>}
        <input
          className="p-3 rounded-lg"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          
          onChange={handleInput}
        />
        <input
          className="p-3 rounded-lg"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleInput}
        />
        <input
          className="p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleInput}
        />
        <button className="p-3 rounded-lg bg-slate-700 text-white hover:opacity-90">
          Update
        </button>

      </form>
      <button className="p-3 rounded-lg bg-green-700 text-white hover:opacity-90 my-5 " >
          Create Listing
        </button>
      <p className="text-red-700 flex mt-3 justify-between">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </p>
    </div>
  );
}
