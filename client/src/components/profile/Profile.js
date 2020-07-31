import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa'

import { changeDisplayName, changePfp } from '../../redux/actions/sessionActions';

import './Profile.css';

const Profile = () => {
  const pfpRef = useRef(null);
  const dispatch = useDispatch();
  const [{ username, displayName, pfp }, pfpLoader] = useSelector((state) => [state.session.account, state.loaders.pfpLoader]);
  const [displayNameInput, setDisplayNameInput] = useState('');

  const onChangeDisplayName = () => {
    if (displayNameInput === displayName)
    {
      return;
    }
    
    setDisplayNameInput(displayName);
    dispatch(changeDisplayName(displayNameInput));
  }

  const onChangePfp = (e) => {
    e.preventDefault();
    dispatch(changePfp(e.target.files[0]));
  }

  useEffect(() => {
    setDisplayNameInput(!!displayName ? displayName : username);
  }, [displayName, username]);

  return (
    <div id="profile-container">
      <div id="profile-header">
        <div id="profile-buttons" className="container">
          <Link to="/profile/settings"><AiTwotoneSetting /><p>Settings</p></Link>
          <Link to="/profile/friends"><FaUserFriends /><p>Friends</p></Link>
        </div>
        <div id="pfp">
          {pfpLoader ? <div className="loader"></div> : null}
          <img src={pfp} alt="pfp" onClick={() => !pfpLoader ? pfpRef.current.click() : null}></img>
        </div>
        <input
          type="file"
          ref={pfpRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onChangePfp}
        />
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
