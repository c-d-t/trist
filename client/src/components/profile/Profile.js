import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa'

import { changeDisplayName } from '../../redux/actions/sessionActions';

import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { username, displayName, pfp } = useSelector((state) => state.session.account);
  const [displayNameInput, setDisplayNameInput] = useState('');

  const onChangeDisplayName = () => {
    if (displayNameInput === displayName)
    {
      return;
    }
    
    setDisplayNameInput(displayName);
    dispatch(changeDisplayName(displayNameInput));
  }

  useEffect(() => {
    setDisplayNameInput(!!displayName ? displayName : username);
  }, [displayName, username]);

  return (
    <div id="profile-container">
      <div id="header">
        <div id="profile-buttons" className="container">
          <Link to="/profile/settings"><AiTwotoneSetting /><p>Settings</p></Link>
          <Link to="/profile/friends"><FaUserFriends /><p>Friends</p></Link>
        </div>
        <img id="pfp" src={pfp} alt="pfp"></img>
        <div id="name" className="container">
          <input
            className="displayName"
            spellCheck="false"
            value={displayNameInput}
            onChange={(e) => setDisplayNameInput(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 ? onChangeDisplayName() : null}
          />
          <div className="username">{username ? username : 'guest_account'}</div>
        </div>
      </div>
        <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
