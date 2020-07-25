import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  const [username, displayName] = useSelector((state) => [state.session.username, state.session.displayName]);

  return (
    <div id="profile-container">
      <div id="header">
        <div className="action-buttons">
          <Link to="/profile/settings">Settings</Link>
          <Link to="/profile/friends">Friends</Link>
        </div>
        <div id="pfp"></div>
      </div>
      <div id="user-info">
        <p id="name">{displayName ? displayName : username}<span className="username-link"> @{username}</span></p>
      </div>
      <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
