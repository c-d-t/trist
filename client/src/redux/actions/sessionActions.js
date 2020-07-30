import { createAPIAction } from './apiActions';
import { makeFormError } from './errorActions';
import { initSocket, closeSocket } from '../../api/socket';

export const REGISTER_AS_GUEST = 'session:guest';
export const REGISTER = 'session:register';
export const LOGIN = 'session:login';
export const LOGGED_IN = 'session:loginSuccess';
export const LOGOUT = 'session:logout';
export const LOGGED_OUT = 'sesion:logoutSuccess';
export const MARCO = 'session:marco';

export function marco()
{
  return createAPIAction({
    url: '/account/marco',
    method: 'GET',
    data: {},
    onSuccess: loggedIn,
    onFailure: loggedOut,
    label: MARCO,
  });
}
export function login({ usernameOrEmail, password })
{
  return createAPIAction({
    url: '/account/login',
    method: 'POST',
    data: { usernameOrEmail, password },
    onSuccess: loggedIn,
    onFailure: makeFormError('Username or password is incorrect.'),
    label: LOGIN,
  });
}
function loggedIn(response)
{
  initSocket();
  return {
    type: LOGGED_IN,
    payload: response.data,
  };
}

export function logout()
{
  return createAPIAction({
    url: '/account/logout',
    method: 'POST',
    onSuccess: loggedOut,
  });
}
function loggedOut()
{
  closeSocket();
  return {
    type: LOGGED_OUT,
  };
}

export function register({ username, email, password })
{
  return createAPIAction({
    url: '/account/register',
    method: 'POST',
    data: { username, email, password },
    onSuccess: loggedIn,
    onFailure: makeFormError(),
    label: REGISTER,
  });
}

export function registerAsGuest({ displayName })
{
  return createAPIAction({
    url: '/account/guest',
    method: 'POST',
    onSuccess: loggedIn,
    onFailure: makeFormError(),
    label: REGISTER_AS_GUEST,
  });
}