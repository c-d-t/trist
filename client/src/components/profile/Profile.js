import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa'

import './Profile.css';

const Profile = () => {
  const { username, displayName} = useSelector((state) => state.session.account);

  return (
    <div id="profile-container">
      <div id="header">
        <img id="pfp" src="https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg" alt="pfp"></img>
        <p id="name">{displayName ? displayName : username}</p>
        <div id="separator"></div>
        {username ? (
        <p className="username-link"> @{username}</p>
        ) : null}
        <div id="profile-buttons">
          <Link to="/profile/settings"><AiTwotoneSetting /></Link>
          <Link to="/profile/friends"><FaUserFriends /></Link>
        </div>
      </div>
        <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
