import { GOT_FRIENDS, GOT_REQUESTS } from '../actions/relationshipActions';

const initState = {
  friendList: [],
  requestList: [],
};

function usersReducer(state = initState, action)
{
  switch (action.type)
  {
    case GOT_FRIENDS:
      return { ...state, friendList: action.payload };
    case GOT_REQUESTS:
      return { ...state, requestList: action.payload };
    default:
      return state;
  }
}

export default usersReducer;
