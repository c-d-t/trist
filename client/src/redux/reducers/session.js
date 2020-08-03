import { LOGGED_IN, CONFIRMED_EMAIL, REGISTERED, LOGGED_OUT, CHANGED_USERNAME, CHANGED_PFP } from '../actions/sessionActions';

const initState = {
  account: {
    accountId: null,
    status: null,
    username: null,
    pfp: null,
  },
  confirmingEmail: false,
  confirmedEmail: false,
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case REGISTERED:
      return { ...state, confirmingEmail: true };
    case CONFIRMED_EMAIL:
      return { ...state, confirmedEmail: true };
    case LOGGED_IN:
      const { id, status, username, pfp } = action.payload;
      return { ...state, account: { ...state.account, id, status, username, pfp: pfp || state.account.pfp }, loggedIn: true };
    case LOGGED_OUT:
      return initState;
    case CHANGED_USERNAME:
      return { ...state, account: { ...state.account, username: action.payload.username } };
    case CHANGED_PFP:
      return { ...state, account: { ...state.account, pfp: action.payload.pfp }};
    default:
      return state;
  }
};

export default sessionReducer;
