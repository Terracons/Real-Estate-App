import React from 'react';

export default function Profile() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Your Profile</h1>
      <p>This is your profile page. Here, you can view and update your information.</p>
      <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Edit Profile
      </button>
    </div>
  );
}
