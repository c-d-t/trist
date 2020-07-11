import { createAPIAction } from './apiActions';

export const GET_DMS = 'channel:getDms';
export const GOT_DMS = 'channel:gotDms';
export const OPEN_CHANNEL = 'channel:open';
export const OPENED_CHANNEL = 'channel:opened'

export function getDms()
{
  return createAPIAction({
    url: '/channel',
    method: 'GET',
    onSuccess: gotDms,
    label: GET_DMS,
  });
}
function gotDms(data)
{
  return {
    type: GOT_DMS,
    payload: data.dms,
  };
}

export function openChannel(channelId)
{
  return createAPIAction({
    url: '/channel',
    method: 'GET',
    data: { channelId },
    onSuccess: openedChannel,
    label: OPEN_CHANNEL,
  });
}
function openedChannel(data)
{
  return {
    type: OPENED_CHANNEL,
    payload: data.dm,
  };
}