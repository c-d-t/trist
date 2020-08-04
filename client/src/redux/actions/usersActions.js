import { createAPIAction } from './apiActions';

export const GET_PROFILE = 'users:getProfile';
export const GOT_PROFILE = 'users:gotProfile';

export function getProfile(accountId)
{
  return createAPIAction({
    url: '/account',
    method: 'GET',
    data: { accountId },
    onSuccess: gotProfile,
    label: GET_PROFILE,
  });
}
function gotProfile(response)
{
  return {
    type: GOT_PROFILE,
    payload: response.data,
  };
}
