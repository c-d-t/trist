import { createAPIAction } from './apiActions';

export const GET_DMS = 'channel:getDms';
export const GOT_DMS = 'channel:gotDms';

export function getDms()
{
  return createAPIAction({
    url: '/channel',
    method: 'GET',
    onSuccess: gotDms,
  });
}
function gotDms({ data })
{
  return {
    type: GOT_DMS,
    payload: data.dms,
  };
}