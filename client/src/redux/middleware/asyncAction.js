const asyncAction = ({ dispatch }) => (next) => (action) => {
  if (typeof action === 'function')
  {
    action(dispatch);
    return;
  }

  next(action);
};

export default asyncAction;
