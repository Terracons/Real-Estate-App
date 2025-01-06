import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const upload_presets = "real_estate";
  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = useState('')

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
      console.log('Image uploaded successfully:', imageUrl);
      setLoading(false);
    } catch (err) {
      console.error('Error uploading image:', err);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-4xl font-bold">Profile</h1>

      <form className="flex flex-col max-w-80 mx-auto gap-4">
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
          placeholder={currentUser.username}
          id="username"
        />
        <input
          className="p-3 rounded-lg"
          type="email"
          placeholder={currentUser.email}
          id="email"
        />
        <input
          className="p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
        />
        <button className="p-3 rounded-lg bg-slate-700 text-white hover:opacity-90">
          Update
        </button>
        <button className="p-3 rounded-lg bg-green-700 text-white hover:opacity-90">
          Create Listing
        </button>
      </form>
      <p className="text-red-700 flex max-w-80 mx-auto justify-between mt-3">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </p>
    </div>
  );
}
