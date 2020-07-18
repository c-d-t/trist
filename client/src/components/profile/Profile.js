import React from 'react';

import './Profile.css';

const Profile = () => {
  return (
    <div id="profile-container">
      <div id="header">
        <div id="pfp"></div>
      </div>
      <p id="name">Berrb</p>
      <button type="button" id="new-post-button" onClick={() => alert('Coming Soon')}>Make Post</button>
    </div>
  );
};

export default Profile;
