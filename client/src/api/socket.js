import io from 'socket.io-client';

let socket = null;
socket = io();
socket.on('test', hi => console.log(hi));

export default function getSocket(store)
{
  if (!socket)
  {
  }
  return socket;
}
