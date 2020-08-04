import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '../../../redux/actions/usersActions';
import { sendFriendRequest, getFriends, getRequests } from '../../../redux/actions/relationshipActions';

const ThisProfile = ({ accountId }) => {
  const dispatch = useDispatch();
  const [users, profileLoader] = useSelector((state) => [state.users, state.loaders.profileLoader]);
  const { id, pfp, username } = users.profile;
  const { friendList, requestList } = users;

  let isFriend = false;
  let isRequested = false;

  friendList.forEach((friend) => {
    if (friend.user.id === id)
    {
      isFriend = true;
    }
  });
  if (!isFriend)
  {
    requestList.forEach((request) => {
      if (request.user.id === id)
      {
        isRequested = true;
      }
    });
  }

  useEffect(() => {
    dispatch(getFriends());
    dispatch(getRequests());
    dispatch(getProfile(accountId));
  }, [accountId]);

  if (!id || profileLoader)
  {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div id="profile-header">
      <div id="pfp">
        <img src={pfp} alt="pfp"></img>
      </div>
      <div id="name" className="container">
        <div className="username">
          {username}
        </div>
      </div>
    </div>
    {isFriend ? <div id="befriend-button">Friends</div> :
    isRequested ? <div id="befriend-button">Friend Request Sent</div> :
      <button type="button" id="befriend-button" onClick={() => dispatch(sendFriendRequest(id))}>
        Send Friend Request
      </button>
    }
    </>
  );
};

export default ThisProfile;
