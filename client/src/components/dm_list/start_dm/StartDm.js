import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends } from '../../../redux/actions/relationshipActions';
import { createDm } from '../../../redux/actions/channelActions';

import UserItem from  '../../user-item';

const StartDm = () => {
  const friendList = useSelector((state) => {
    return state.users.friendList.filter((friend) => {
      let hasDm = false;
      state.channel.dms.forEach((dm) => {
        if (dm.user.id === friend.user.id)
        {
          hasDm = true;;
        }
      });
      return !hasDm;
    });
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (friendList.length === 0)
    {
      dispatch(getFriends());
    }
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

export default StartDm;
