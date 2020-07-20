import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRequests, acceptRequest } from '../../../redux/actions/relationshipActions';

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
      dispatch(acceptRequest(friendRequestId))
    };
  };
  
  return (
    <div className="list-container">
      {requestList.map((request, index) => {
        return <UserItem
          key={`request${index}`}
          name={request.user.username}
          buttonOne={{ text: 'accept', onClick: makeOnAcceptRequest(request.id)}}
          buttonTwo={{ text: 'decline', onClick: makeOnAcceptRequest(request.id)}}
        />
      })}
    </div>
  );
};

export default Requests;
