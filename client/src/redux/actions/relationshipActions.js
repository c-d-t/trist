import { createAPIAction } from './apiActions';

export const SEND_FRIEND_REQUEST = 'relationships:sendFriendRequest';
export const SENT_FRIEND_REQUEST = 'relationships:sentFriendRequest';
export const SENT_FRIEND_REQUEST_FAILED = 'realtionships:sentFriendRequestFailed';
export const GET_FRIENDS = 'relationships:getFriends';
export const GOT_FRIENDS = 'relationships:gotFriends';
export const GOT_REQUESTS = 'relationships:gotRequests';
export const ACCEPTED_REQUEST = 'relationships:acceptedRequest';
export const DECLINED_REQUEST = 'relationships:declinedRequest';
export const REMOVED_RELATIONSHIP = 'relationship:removed';

export function getFriends()
{
  return createAPIAction({
    url: '/friends',
    method: 'GET',
    onSuccess: gotFriends,
    label: GET_FRIENDS,
  });
}
function gotFriends(response)
{
  return {
    type: GOT_FRIENDS,
    payload: response.data.friends,
  };
}

export function getRequests()
{
  return createAPIAction({
    url: '/friends/requests',
    method: 'GET',
    onSuccess: gotRequests,
  });
}
function gotRequests(response)
{
  return {
    type: GOT_REQUESTS,
    payload: response.data.requests,
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
function sentFriendRequest(response)
{
  return {
    type: SENT_FRIEND_REQUEST,
    payload: response.data,
  };
}
function sentFriendRequestFailed(response)
{
  return {
    type: SENT_FRIEND_REQUEST_FAILED,
    payload: response.data,
  };
}

export function acceptRequest(friendRequestId)
{
  return createAPIAction({
    url: '/friends/accept',
    method: 'POST',
    data: { friendRequestId },
    onSuccess: makeAcceptedRequest(friendRequestId),
  });
}
function makeAcceptedRequest(requestId)
{
  return function acceptedRequest()
  {
    return {
      type: ACCEPTED_REQUEST,
      payload: { requestId },
    };
  }
}

export function removeRelationship(relationshipId)
{
  return createAPIAction({
    url: '/friends',
    method: 'DELETE',
    data: { relationshipId },
    onSuccess: makeRemoveRelationship(relationshipId),
  });
}
function makeRemoveRelationship(relationshipId)
{
  return function removedRelationship()
  {
    return {
      type: REMOVED_RELATIONSHIP,
      payload: { relationshipId },
    };
  }
}

export function declineRequest(requestId)
{
  return createAPIAction({
    url: '/friends',
    method: 'DELETE',
    data: { relationshipId: requestId },
    onSuccess: makeDeclinedRequest(requestId),
  });
}
function makeDeclinedRequest(requestId)
{
  return function declinedRequest()
  {
    return {
      type: DECLINED_REQUEST,
      payload: { requestId },
    };
  }
}
