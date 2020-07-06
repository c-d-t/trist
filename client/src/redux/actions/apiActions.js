export const API = 'api';
export const API_START = 'api:start';
export const API_END = 'api:end';
export const API_ERROR = 'api:error';

export function apiStart(label)
{
  return {
    type: API_START,
    payload: label,
  };
}

export function apiEnd(label)
{
  return {
    type: API_END,
    payload: label,
  };
}

export function apiError(error)
{
  return {
    type: API_ERROR,
    error,
  };
}

export function createAPIAction({url, method, data, onSuccess, onFailure, label})
{
  return {
    type: API,
    payload: {
      url, method, data, onSuccess, onFailure, label,
    },
  };
}