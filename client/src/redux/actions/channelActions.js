import { createAPIAction } from './apiActions';

export const GET_DMS = 'channel:getDms';
export const GOT_DMS = 'channel:gotDms';
export const ADD_DM = 'channel:addDm';
export const OPEN_CHANNEL = 'channel:open';
export const OPENED_CHANNEL = 'channel:opened';
export const CLOSED_CHANNEL = 'channel:closed';
export const GOT_MESSAGE = 'channel:gotMessage';
export const SEND_MESSAGE = 'channel:sendMessage';
export const SENT_MESSAGE = 'channel:sentMessage';
export const GOT_OPEN_CHANNELS = 'channel:gotOpenChannels';

export function getDms()
{
  return createAPIAction({
    url: '/channel',
    method: 'GET',
    onSuccess: gotDms,
    label: GET_DMS,
  });
}
function gotDms(response)
{
  return {
    type: GOT_DMS,
    payload: response.data.dms,
  };
}

export function getOpenChannels()
{
  return createAPIAction({
    url: '/channel/open',
    method: 'GET',
    onSuccess: gotOpenChannels,
  });
}
function gotOpenChannels(response)
{
  return {
    type: GOT_OPEN_CHANNELS,
    payload: response.data.channels,
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
function openedChannel(response)
{
  return {
    type: OPENED_CHANNEL,
    payload: {
      channel: response.data.channel,
      messages: response.data.messages
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
    onFailure: makeSendMessageFailed(channelId),
    label: SEND_MESSAGE,
  });
}
function makeSendMessageFailed(channelId)
{
  return function sendMessageFailed(response)
  {
    let text = response.data.data;
    if (response.status === 404 || response.status === 400)
    {
      return {
        type: 'nothing'
      };
    }
    if (response.status === 429)
    {
      text = 'Slow down there, tiger.'
    }
    return {
      type: GOT_MESSAGE,
      payload: {
        message: {
          system: true,
          channelId,
          text,
        },
      },
    }
  }
}

export function joinPrivateChannel()
{
  return createAPIAction({
    url: '/channel/private',
    method: 'POST',
    onSuccess: openedPrivateChannel,
    label: OPENED_CHANNEL,
  });
}
function openedPrivateChannel(response)
{
  return {
    type: OPENED_CHANNEL,
    payload: { channel: { id: response.data.channelId, type: 2 }, messages: [{ system: true, text: 'waiting for someone...' }] },
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

export function createSystemMessage(text)
{
  return {
    type: GOT_MESSAGE,
    payload: {
      message: {
        system: true,
        text,
      }
    }
  };
}