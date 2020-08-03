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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeOnRemoveFriend = (friendRequestId) => {
    return function()
    {
      dispatch(removeRelationship(friendRequestId));
    };
  };
  
  return (
    <div className="list-container">
      <h2>Friends</h2>
      {friendList.length === 0 ? (
        <div className="sm">No friends rn. Go add some!</div>
      ) : friendList.map((request, index) => {
        return <UserItem
          key={`request${index}`}
          name={request.user.username}
          pfp={request.user.pfp}
          buttonOne={{ text: 'remove', onClick: makeOnRemoveFriend(request.id), warning: true }}
        />
      })}
    </div>
  );
};

export default Friends;
