import io from 'socket.io-client';
import { GOT_MESSAGE, getDms, createSystemMessage } from '../redux/actions/channelActions';
import { connect, disconnect } from '../redux/actions/connectionActions';

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
  store.dispatch(connect());
  socket.on('message-created', (data) => {
    let hasDm = false;
    store.getState().channel.dms.forEach((dm) => {
      if (dm.id === data.message.channelId)
      {
        hasDm = true;
      }
    });
    if (!hasDm)
    {
      store.dispatch(getDms());
    }
    store.dispatch({ type: GOT_MESSAGE, payload: data });
  });

  socket.on('connection-created', (data) => {
    const { channel } = data;
    const { account } = store.getState().session;
    const otherUser = channel.participants.filter((participant) => {
      return participant.id !== account.id;
    })[0];
    store.dispatch(createSystemMessage(`You connected with ${otherUser.name}`));
  });

  socket.on('disconnect', () => {
    console.log('disconnected')
    store.dispatch(disconnect());
  });

  socket.on('reconnecting', (n) => {
    console.log('reconnecting', n)
  })

  socket.on('reconnect', (n) => {
    console.log('reconnect', n)
    store.dispatch(connect());
    const channelId = store.getState().channel.currentChannel.id;
    socket.emit('socket:reconnected', { channelId });
  });
  
  socket.on('connection-lost', (data) => {
    const { channel } = data;
    if (channel)
    {
      const otherUser = channel.participants[0];
      store.dispatch(createSystemMessage(`${otherUser.name} disconnected`));
    }
  });
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

export function getSocket()
{
  return socket;
}
