import { createAPIAction } from './apiActions';
import { makeFormError } from './errorActions';
import { initSocket, closeSocket } from '../../api/socket';

export const REGISTER_AS_GUEST = 'session:guest';
export const REGISTER = 'session:register';
export const REGISTERED = 'session:registered';
export const LOGIN = 'session:login';
export const LOGGED_IN = 'session:loginSuccess';
export const LOGOUT = 'session:logout';
export const LOGGED_OUT = 'sesion:logoutSuccess';
export const MARCO = 'session:marco';
export const UPGRADE = 'session:upgrade';
export const CHANGED_USERNAME = 'session:changedDisplayName';
export const CHANGE_PFP = 'session:changePfp';
export const CHANGED_PFP = 'session:changedPfp';
export const CONFIRMED_EMAIL = 'session:confirmedEmail';

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
export function login({ email, password })
{
  return createAPIAction({
    url: '/account/login',
    method: 'POST',
    data: { email, password },
    onSuccess: loggedIn,
    onFailure: makeFormError(),
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
    onSuccess: registered,
    onFailure: makeFormError(),
    label: REGISTER,
  });
}
function registered()
{
  return {
    type: REGISTERED,
  }
}

export function registerAsGuest({ username })
{
  return createAPIAction({
    url: '/account/guest',
    method: 'POST',
    data: { username },
    onSuccess: loggedIn,
    onFailure: makeFormError(),
    label: REGISTER_AS_GUEST,
  });
}

export function confirmEmail(token)
{
  return createAPIAction({
    url: '/verify',
    method: 'POST',
    data: { token },
    onSuccess: confirmedEmail,
  });
}
function confirmedEmail()
{
  return {
    type: CONFIRMED_EMAIL,
  };
}

export function upgradeAccount({ username, email, password })
{
  return createAPIAction({
    url: '/account/upgrade',
    method: 'PUT',
    data: { username, email, password },
    onSuccess: loggedIn,
    onFailure: makeFormError(),
    label: UPGRADE,
  });
}

export function changeUsername(username)
{
  return createAPIAction({
    url: '/account/username',
    method: 'PUT',
    data: { username },
    onSuccess: makeChangedUsername(username),
  });
}
function makeChangedUsername(username)
{
  return function changedUsername()
  {
    return {
      type: CHANGED_USERNAME,
      payload: { username },
    }
  }
}

export function changePfp(file)
{
  const fileData = new FormData();
  fileData.append('image', file);
  return createAPIAction({
    url: '/account/pfp',
    method: 'PUT',
    file: true,
    data: fileData,
    label: CHANGE_PFP,
    onSuccess: changedPfp,
  })
}
function changedPfp(response)
{
  return {
    type: CHANGED_PFP,
    payload: { pfp: response.data.pfp },
  }
}

export function deleteAccount()
{
  return createAPIAction({
    url: '/account',
    method: 'DELETE',
    onSuccess: loggedOut,
  })
}