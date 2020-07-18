import io from 'socket.io-client';
import { GOT_MESSAGE } from '../redux/actions/channelActions';

let socket = null;
let store = null;

export const joinChannel = (channelId) => {
  socket.emit('join-channel', { channelId });
};

export const leaveChannel = (channelId) => {
  socket.emit('leave-channel', { channelId });
};

export function initSocket()
{
  socket = io();
  socket.on('message-created', (data) => {
    store.dispatch({ type: GOT_MESSAGE, payload: data });
  });
}

export function closeSocket()
{
  socket.disconnect();
  socket = null;
}

export function setStore(_store)
{
  store = _store;
}
