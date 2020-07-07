import { createAPIAction } from './apiActions';

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
