import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  return (
    <div id="profile-container">
      <div id="header">
        <div id="pfp"></div>
      </div>
      <div id="action-buttons">
        <Link to="/profile/settings">Settings </Link>
        <Link to="/profile/friends"> Friends</Link>
      </div>
      <p id="name">Berrb</p>
      <button type="button" id="new-post-button" onClick={() => alert('Coming Soon')}>Make Post</button>
    </div>
  );
};

export default Profile;
