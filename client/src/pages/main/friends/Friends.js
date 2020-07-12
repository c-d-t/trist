import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends } from '../../../redux/actions/usersActions';

import Friend from './Friend';

const Friends = () => {
  const friendList = useSelector((state) => state.users.friendList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []); 

  return (
    <>
      <div className="create-container">
        <button>Add Friend</button>
      </div>
      {friendList.map((friendship) => (
        <Friend username={friendship.user.username} />
      ))}
    </>
  );
};

export default Friends;
