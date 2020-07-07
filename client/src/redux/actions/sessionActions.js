import { createAPIAction } from './apiActions';
import { makeFormError } from './errorActions';

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
  });
}
function loggedOut()
{
  return {
    type: LOGGED_OUT,
  };
}