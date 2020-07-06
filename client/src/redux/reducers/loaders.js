import { API_START, API_END } from '../actions/apiActions';
import { LOGIN, LOGOUT } from '../actions/sessionActions';

const initState = {
  formLoader: false,
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

  switch (action.label)
  {
    case LOGIN:
      return { ...state, formLoader: isLoading };
    default:
      return state;
  }
};

export default loadersReducer;
