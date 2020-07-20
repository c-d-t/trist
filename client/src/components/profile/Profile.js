import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  return (
    <div id="profile-container">
      <div id="header">
        <div id="pfp"></div>
      </div>
      <div className="action-buttons">
        <Link to="/profile/settings">Settings </Link>
        <Link to="/profile/friends"> Friends</Link>
      </div>
      <p id="name">[Username goes here]</p>
      <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
