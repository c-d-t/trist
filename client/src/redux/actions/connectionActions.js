export const CONNECT = 'connection:connect';
export const DISCONNECT = 'connection:disconnect';

export function connect()
{
  return {
    type: CONNECT,
  };
}

export function disconnect()
{
  return {
    type: DISCONNECT,
  };
}
