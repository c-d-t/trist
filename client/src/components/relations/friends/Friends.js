import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFriends, removeRelationship } from '../../../redux/actions/relationshipActions';

import UserItem from  '../../user-item';

const Friends = () => {
  const friendList = useSelector((state) => state.users.friendList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (friendList.length === 0)
    {
      dispatch(getFriends());
    }
  }, []);

  const makeOnRemoveFriend = (friendRequestId) => {
    return function()
    {
      dispatch(removeRelationship(friendRequestId));
    };
  };
  
  return (
    <div className="list-container">
      {friendList.map((request, index) => {
        return <UserItem
          key={`request${index}`}
          name={request.user.username}
          buttonOne={{ text: 'remove', onClick: makeOnRemoveFriend(request.id), warning: true }}
        />
      })}
    </div>
  );
};

export default Friends;
