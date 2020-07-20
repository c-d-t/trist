import { createAPIAction } from './apiActions';

export const SEND_FRIEND_REQUEST = 'relationships:sendFriendRequest';
export const SENT_FRIEND_REQUEST = 'relationships:sentFriendRequest';
export const SENT_FRIEND_REQUEST_FAILED = 'realtionships:sentFriendRequestFailed';
export const GET_FRIENDS = 'users:getFriends';
export const GOT_FRIENDS = 'users:gotFriends';

export function getFriends()
{
  return createAPIAction({
    url: '/friends',
    method: 'GET',
    onSuccess: gotFriends,
    label: GET_FRIENDS,
  });
}
function gotFriends(data)
{
  return {
    type: GOT_FRIENDS,
    payload: data.friends,
  };
}

export function sendFriendRequest(username)
{
  return createAPIAction({
    url: '/friends/request',
    method: 'POST',
    data: { otherAccountUsername: username },
    onSuccess: sentFriendRequest,
    onFailure: sentFriendRequestFailed,
  });
}
function sentFriendRequest(data)
{
  return {
    type: SENT_FRIEND_REQUEST,
    data,
  };
}
function sentFriendRequestFailed(data)
{
  return {
    type: SENT_FRIEND_REQUEST_FAILED,
    data,
  };
}