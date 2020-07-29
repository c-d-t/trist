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
  if (!!socket) return;
  socket = io();
  socket.on('message-created', (data) => {
    store.dispatch({ type: GOT_MESSAGE, payload: data });
  });

  socket.on('connection-created', (data) => {
    const { channel } = data;
    const { account } = store.getState().session;
    const otherUser = channel.participants.filter((participant) => {
      return participant.id !== account.id;
    })[0];
    store.dispatch({
      type: GOT_MESSAGE,
      payload: {
        message: {
          system: true,
          channelId: channel.id,
          text: `You connected with ${otherUser.name}`
        }
      }
    });
  });
  
  socket.on('connection-lost', (data) => {
    const { channel } = data;
    const otherUser = channel.participants[0];
    store.dispatch({
      type: GOT_MESSAGE,
      payload: {
        message: {
          system: true,
          channelId: channel.id,
          text: `${otherUser.name} disconnected`,
        }
      }
    });
  })
}

export function closeSocket()
{
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

export function setStore(_store)
{
  store = _store;
}
