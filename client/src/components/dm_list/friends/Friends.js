import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends } from '../../../redux/actions/relationshipActions';
import { createDm } from '../../../redux/actions/channelActions';

import UserItem from  '../../user-item';

const Friends = () => {
  const friendList = useSelector((state) => state.users.friendList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const makeStartDM = (friendRequestId) => {
    return function()
    {
      dispatch(createDm(friendRequestId));
    };
  };
  
  return (
    <div className="list-container" style={{ margin: '0' }}>
      {friendList.map((friend, index) => {
        return <UserItem
          key={`request${index}`}
          className="fade-hover"
          name={friend.user.username}
          buttonOne={{ text: 'Start', onClick: makeStartDM(friend.user.id) }}
        />
      })}
    </div>
  );
};

export default Friends;
