import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends, getRequests, sendFriendRequest } from '../../redux/actions/relationshipActions';
import { clearErrors } from '../../redux/actions/errorActions';

import Requests from './requests';
import Friends from './friends';

import './Friends.css';

const Relations = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [addFriendInput, setAddFriendInput] = useState('');
  const [friendInputOpen, setFriendInputOpen] = useState(false);
  const errors = useSelector((state) => state.errors.formErrors);
  const dispatch = useDispatch();

  useEffect(() => {
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
      case 0: return <Friends />;
      case 1: return <Requests />;
      default: return null;
    }
  };

  return (
    <>
      <div className="action-buttons">
        {currentTab === 0 ?
        <button type="button" style={{ backgroundColor: 'rgb(33, 226, 152)' }} onClick={() => { setFriendInputOpen(!friendInputOpen); dispatch(clearErrors()); } }>Add Friend</button> :
        <button type="button" onClick={() => setCurrentTab(0)}>Friends</button>
        }
        <button style={currentTab === 1 ? { backgroundColor: 'rgb(33, 226, 152)' } : {}} onClick={() => { setCurrentTab(1); dispatch(clearErrors()); setFriendInputOpen(false); } }>Requests</button>
        <button style={currentTab === 2 ? { backgroundColor: 'rgb(33, 226, 152)' } : {}} onClick={() => alert('Blocking will be coming soon.')}>Blocks</button>
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

export default Relations;
