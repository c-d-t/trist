import io from 'socket.io-client';
import { GOT_MESSAGE } from '../redux/actions/channelActions';

let socket = null;

export const joinChannel = (channelId) => {
  socket.emit('join-channel', { channelId });
};

export const leaveChannel = (channelId) => {
  socket.emit('leave-channel', { channelId });
};

export default function getSocket(store)
{
  if (!socket)
  {
    socket = io();
    console.log('socket instance created')
    socket.on('message-created', (data) => {
      store.dispatch({ type: GOT_MESSAGE, payload: data });
    });
  }
  return socket;
}
