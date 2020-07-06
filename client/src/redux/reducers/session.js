import { LOGGED_IN } from '../actions/thisAccountActions';

const initState = {
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      return { loggedIn: true }
    default:
      return state;
  }
};

export default sessionReducer;
