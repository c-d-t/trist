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
    label: LOGOUT,
  });
}

function loggedOut()
{
  return {
    type: LOGGED_OUT,
  };
}