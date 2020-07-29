export const CREATE_NOTIFICATION = 'notifications:create';
export const CLEAR_NOTIFICATION = 'notification:clear';

let i = 0;

export const createNotification = (message) => (dispatch) => {
  const id = i++;
  dispatch({
    type: CREATE_NOTIFICATION,
    payload: { id, message },
  });

  setTimeout(() => {
    dispatch({
      type: CLEAR_NOTIFICATION,
      payload: { id },
    });
  }, 5000);
};

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
    payload: { any: true },
  };
};
