import { LOGGED_IN, LOGGED_OUT } from '../actions/sessionActions';

const initState = {
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      return { loggedIn: true };
    case LOGGED_OUT:
      return { loggedIn: false };
    default:
      return state;
  }
};

export default sessionReducer;
