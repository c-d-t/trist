import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa'
import { useWindowDimensions } from '../../api/windowDimensions';

import { changeUsername, changePfp } from '../../redux/actions/sessionActions';

import './Profile.css';

const Profile = () => {
  const pfpRef = useRef(null);
  const dispatch = useDispatch();
  const [{ username, pfp }, pfpLoader] = useSelector((state) => [state.session.account, state.loaders.pfpLoader]);
  const [usernameInput, setUsernameInput] = useState('');
  const { width } = useWindowDimensions();

  const onChangeUsername = () => {
    if (usernameInput === username)
    {
      return;
    }
    
    setUsernameInput(username);
    dispatch(changeUsername(usernameInput));
  }

  const onChangePfp = (e) => {
    e.preventDefault();
    dispatch(changePfp(e.target.files[0]));
  }

  useEffect(() => {
    setUsernameInput(username);
    // TODO 
  }, [username]);

  return (
    <div id="profile-container">
      <div id="profile-header">
        {width < 1025 ? (
          <div id="profile-buttons" className="container">
            <Link to="/profile/settings"><AiTwotoneSetting /><p>Settings</p></Link>
            <Link to="/profile/friends"><FaUserFriends /><p>Friends</p></Link>
          </div>
        ) : null}
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
            className="username"
            spellCheck="false"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 ? onChangeUsername() : null}
          />
        </div>
      </div>
        <button type="button" id="new-post-button" onClick={() => alert('Making posts are disabled.')}>+</button>
    </div>
  );
};

export default Profile;
