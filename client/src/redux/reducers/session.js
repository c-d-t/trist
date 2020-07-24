import { LOGGED_IN, LOGGED_OUT } from '../actions/sessionActions';

const initState = {
  accountId: null,
  username: null,
  displayName: null,
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      const { id, username, displayName } = action.payload;
      return { accountId: id, username, displayName, loggedIn: true };
    case LOGGED_OUT:
      return { accountId: null, loggedIn: false };
    default:
      return state;
  }
};

export default sessionReducer;
