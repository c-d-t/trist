import { LOGGED_IN } from '../actions/thisAccountActions';

const initState = {
  isLoggedIn: false,
  username: null,
};

const thisAccountReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      return { isLoggedIn: true, username: action.account.username }
    default:
      return state;
  }
};

export default thisAccountReducer;
