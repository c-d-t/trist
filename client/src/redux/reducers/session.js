import { LOGGED_IN, LOGGED_OUT, CHANGED_DISPLAY_NAME, CHANGED_PFP } from '../actions/sessionActions';

const initState = {
  account: {
    accountId: null,
    status: null,
    username: null,
    displayName: null,
    pfp: null,
  },
  loggedIn: false,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type)
  {
    case LOGGED_IN:
      const { id, status, username, displayName, pfp } = action.payload;
      return { account: { id, status, username, displayName, pfp }, loggedIn: true };
    case LOGGED_OUT:
      return { account: null, loggedIn: false };
    case CHANGED_DISPLAY_NAME:
      return { ...state, account: { ...state.account, displayName: action.payload.displayName } };
    case CHANGED_PFP:
      return { ...state, account: { ...state.account, pfp: action.payload.pfp }};
    default:
      return state;
  }
};

export default sessionReducer;
