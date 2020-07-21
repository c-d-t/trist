import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRequests, acceptRequest, removeRelationship } from '../../../redux/actions/relationshipActions';

import UserItem from  '../../user-item';

const Requests = () => {
  const requestList = useSelector((state) => state.users.requestList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  const makeOnAcceptRequest = (friendRequestId) => {
    return function()
    {
      dispatch(acceptRequest(friendRequestId));
    };
  };

  const makeOnDeclineRequest = (friendRequestId) => {
    return function()
    {
      dispatch(removeRelationship(friendRequestId));
    };
  };
  
  return (
    <div className="list-container">
      {requestList.map((request, index) => {
        if (request.status === 0)
        {
          return <UserItem
            key={`request${index}`}
            name={request.user.username}
            secondary="friend request sent..."
            buttonOne={{ text: 'cancel', onClick: makeOnDeclineRequest(request.id)}}
          />
        }
        else
        {
          return <UserItem
            key={`request${index}`}
            name={request.user.username}
            secondary="sent a friend request"
            buttonOne={{ text: 'accept', onClick: makeOnAcceptRequest(request.id)}}
            buttonTwo={{ text: 'decline', onClick: makeOnDeclineRequest(request.id)}}
          />
        }
      })}
    </div>
  );
};

export default Requests;
