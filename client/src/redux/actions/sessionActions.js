import { createAPIAction } from './apiActions';

export const LOGIN = 'session:login';
export const LOGGED_IN = 'session:loginSuccess';
export const LOGOUT = 'session:logout';
export const LOGGED_OUT = 'seesion:logoutSuccess';

export function login({ usernameOrEmail, password })
{
  return createAPIAction({
    url: '/account/login',
    method: 'POST',
    data: { usernameOrEmail, password },
    onSuccess: loggedIn,
    onFailure: console.log('failed to log in'),
    label: LOGIN,
  });
}

function loggedIn()
{
  return {
    type: LOGGED_IN,
  };
}

export function logout()
{
  return createAPIAction({
    url: '/account/logout',
    method: 'POST',
    onSuccess: loggedOut,
    onFailure: () => console.log('Error trying to log out.'),
    label: LOGOUT,
  });
}

function loggedOut()
{
  return {
    type: LOGGED_OUT,
  };
}