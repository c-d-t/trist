import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends, getRequests, sendFriendRequest } from '../../redux/actions/relationshipActions';
import { clearErrors } from '../../redux/actions/errorActions';

import UserItem from '../user-item';
import Requests from './requests';

import './Friends.css';

const Friends = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [addFriendInput, setAddFriendInput] = useState('');
  const [friendInputOpen, setFriendInputOpen] = useState(false);
  const [friendList, requestList, errors] = useSelector((state) => [state.users.friendList, state.users.requestList, state.errors.formErrors]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getFriends());
    dispatch(getRequests());
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

  const renderContent = () => {
    switch(currentTab) 
    {
      case 0:
        if (friendList.length === 0) return <div className="sm">Empty</div>
        return (
        <div className="list-container">
          {friendList.map((friendship, index) => (
            <UserItem key={`relationship${index}`} name={friendship.user.username} />
          ))}
        </div>)
      case 1:
        return <Requests />;
      default:
        return <div className="sm">Nothing here</div>
    }
  };

  return (
    <>
      <div className="action-buttons">
        {currentTab === 0 ?
        <button type="button" onClick={() => { setFriendInputOpen(!friendInputOpen); dispatch(clearErrors()); } }>Add Friend</button> :
        <button type="button" onClick={() => setCurrentTab(0)}>Friends</button>
        }
        <button onClick={() => { setCurrentTab(1); dispatch(clearErrors()); } }>Requests</button>
        <button onClick={() => alert('Blocking will be coming soon.')}>Blocks</button>
      </div>
      {!errors ? null : Object.keys(errors).map((errorName, i) => (
        <div key={`formError${i}`} className="add-friend-error">{errors[errorName]}</div>
      ))}
      <div id="friend-input-container" style={friendInputOpen && currentTab === 0 ? { height: '50px' } : { height: '0px' }}>
        <input type="text" placeholder="username" value={addFriendInput} onChange={(e) => setAddFriendInput(e.target.value)} />
        <button type="button" onClick={onSendFriendRequest} className={(addFriendInput.length === 0) ? 'faded' : ''}>Send</button>
      </div>

      {renderContent()}
    </>
  );
};

export default Friends;
