import { API_START, API_END } from '../actions/apiActions';
import { MARCO, LOGIN, CHANGE_PFP } from '../actions/sessionActions';
import { SEND_MESSAGE, OPEN_CHANNEL } from '../actions/channelActions';
import { GET_PROFILE } from '../actions/usersActions';

const initState = {
  pageLoader: false,
  formLoader: false,
  channelLoader: false,
  pfpLoader: false,
  messageLoader: null,
  profileLoader: false,
};

const loadersReducer = (state = initState, action) => {
  let isLoading; 
  if (action.type === API_START)
  {
    isLoading = true;
  }
  else if (action.type === API_END)
  {
    isLoading = false;
  }
  else
  {
    return state;
  }
  
  switch (action.payload)
  {
    case MARCO:
      return { ...state, pageLoader: isLoading };
    case LOGIN:
      return { ...state, formLoader: isLoading };
    case CHANGE_PFP:
      return { ...state, pfpLoader: isLoading };
    case SEND_MESSAGE:
      return { ...state, messageLoader: isLoading };
    case OPEN_CHANNEL:
      return { ...state, channelLoader: isLoading };
    case GET_PROFILE:
      return { ...state, profileLoader: isLoading };
    default:
      return state;
  }
};

export default loadersReducer;
