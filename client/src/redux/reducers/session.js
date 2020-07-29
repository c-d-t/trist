import { LOGGED_IN, LOGGED_OUT } from '../actions/sessionActions';

const initState = {
  account: {
    accountId: null,
    status: null,
    username: null,
    displayName: null,
  },
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      const { id, status, username, displayName } = action.payload;
      return { account: { id, status, username, displayName }, loggedIn: true };
    case LOGGED_OUT:
      return { account: null, loggedIn: false };
    default:
      return state;
  }
};

export default sessionReducer;
