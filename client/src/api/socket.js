import io from 'socket.io-client';

let socket = null;
socket = io();
socket.on('message-created', data => console.log(data));

export default function getSocket(store)
{
  if (!socket)
  {
  }
  return socket;
}
