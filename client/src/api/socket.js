import * as io from 'socket.io-client';

let socket = null;

export default function getSocket(store)
{
  if (!socket)
  {
    socket = io.connect();
    
  }
  return socket;
}
