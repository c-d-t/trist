import { GOT_FRIENDS, GOT_REQUESTS, ACCEPTED_REQUEST, DECLINED_REQUEST, REMOVED_RELATIONSHIP } from '../actions/relationshipActions';

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
    case ACCEPTED_REQUEST:
    case DECLINED_REQUEST:
      return {
        ...state,
        requestList: state.requestList.filter((request) => request.id !== action.payload.requestId),
      };
    case REMOVED_RELATIONSHIP:
      return {
        ...state,
        friendList: state.friendList.filter((friend) => friend.id !== action.payload.relationshipId),
      }
    default:
      return state;
  }
}

export default usersReducer;
