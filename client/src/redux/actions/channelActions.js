import { createAPIAction } from './apiActions';

export const GET_DMS = 'channel:getDms';
export const GOT_DMS = 'channel:gotDms';
export const ADD_DM = 'channel:addDm';
export const OPEN_CHANNEL = 'channel:open';
export const OPENED_CHANNEL = 'channel:opened';
export const CLOSED_CHANNEL = 'channel:closed';
export const GOT_MESSAGE = 'channel:gotMessage';
export const SENT_MESSAGE = 'channel:sentMessage';

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
    url: '/channel/messages',
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
    payload: {
      channel: data.channel,
      messages: data.messages
    },
  };
}

export function closeChannel()
{
  return {
    type: CLOSED_CHANNEL,
  };
}

export function sendMessage(channelId, text)
{
  return createAPIAction({
    url: '/channel/messages',
    method: 'POST',
    data: { channelId, text },
  });
}

export function joinPrivateChannel()
{
  return createAPIAction({
    url: '/channel/private',
    method: 'POST',
    onSuccess: openedPrivateChannel,
  });
}
function openedPrivateChannel(data)
{
  return {
    type: OPENED_CHANNEL,
    payload: { channel: { id: data.channelId, type: 2 }, messages: [{ system: true, text: 'waiting for someone...' }] },
  };
}

export function leavePrivateChannel(channelId)
{
  return createAPIAction({
    url: '/channel/private',
    method: 'DELETE',
    data: { channelId },
  });
}

export function createDm(otherAccountId)
{
  return createAPIAction({
    url: '/channel',
    method: 'POST',
    data: { otherAccountId },
    onSuccess: getDms,
  });
}
