import { GOT_FRIENDS } from '../actions/relationshipActions';

const initState = {
  friendList: [],
};

function usersReducer(state = initState, action)
{
  switch (action.type)
  {
    case GOT_FRIENDS:
      return { ...state, friendList: action.payload };
    default:
      return state;
  }
}

export default usersReducer;
