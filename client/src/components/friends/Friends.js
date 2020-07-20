import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends, sendFriendRequest } from '../../redux/actions/relationshipActions';
import { clearErrors } from '../../redux/actions/errorActions';

import Friend from './Friend';

import './Friends.css';

const Friends = () => {
  const [addFriendInput, setAddFriendInput] = useState('');
  const [friendInputOpen, setFriendInputOpen] = useState(false);
  const [friendList, errors] = useSelector((state) => [state.users.friendList, state.errors.formErrors]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
    return () => {
      dispatch(clearErrors());
    };
  }, []); 

  const onSendFriendRequest = () => {
    if (addFriendInput.length === 0)
    {
      return;
    }

    dispatch(sendFriendRequest(addFriendInput));
    setAddFriendInput('');
  };

  return (
    <>
      <div className="action-buttons">
        <button type="button" onClick={() => { setFriendInputOpen(!friendInputOpen); dispatch(clearErrors()) } }>Add Friend</button>
        <button onClick={() => alert('Blocking will be coming soon.')}>Blocks</button>
        <Link to="/profile/requests">Requests</Link>
      </div>
      {!errors ? null : Object.keys(errors).map((errorName, i) => (
        <div key={`formError${i}`} className="add-friend-error">{errors[errorName]}</div>
      ))}
      <div id="friend-input-container" style={friendInputOpen ? { height: '50px' } : { height: '0px' }}>
        <input type="text" placeholder="username" value={addFriendInput} onChange={(e) => setAddFriendInput(e.target.value)} />
        <button type="button" onClick={onSendFriendRequest} className={(addFriendInput.length === 0) ? 'faded' : ''}>Send</button>
      </div>
      <div className="list-container">
        {friendList.map((friendship, index) => (
          <Friend key={`friendlist${index}`} username={friendship.user.username} />
        ))}
      </div>
    </>
  );
};

export default Friends;
