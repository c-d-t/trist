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
        <div id="profile-buttons" className="container">
          <Link to="/profile/settings"><AiTwotoneSetting /><p>Settings</p></Link>
          <Link to="/profile/friends"><FaUserFriends /><p>Friends</p></Link>
        </div>
        <img id="pfp" src="https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg" alt="pfp"></img>
        <div id="name" className="container">
          <div className="displayName">{displayName ? displayName : username}</div>
          {username ? (
            <div className="username"> @{username}</div>
          ) : null}
        </div>
      </div>
        <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
