import { API_START, API_END } from '../actions/apiActions';
import { MARCO, LOGIN, CHANGE_PFP } from '../actions/sessionActions';

const initState = {
  pageLoader: false,
  formLoader: false,
  channelLoader: false,
  pfpLoader: false,
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
    default:
      return state;
  }
};

export default loadersReducer;
