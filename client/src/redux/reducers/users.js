import { GOT_FRIENDS, GOT_REQUESTS, ACCEPTED_REQUEST, DECLINED_REQUEST, REMOVED_RELATIONSHIP, SENT_FRIEND_REQUEST } from '../actions/relationshipActions';
import { GOT_PROFILE } from '../actions/usersActions';

const initState = {
  friendList: [],
  requestList: [],
  profile: {
    id: null,
    username: null,
    pfp: null,
  },
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
    case SENT_FRIEND_REQUEST:
      return { ...state, requestList: [ ...state.requestList, { user: { id: action.payload.otherAccountId }} ]};
    case DECLINED_REQUEST:
      return {
        ...state,
        requestList: state.requestList.filter((request) => request.id !== action.payload.requestId),
      };
    case REMOVED_RELATIONSHIP:
      return {
        ...state,
        friendList: state.friendList.filter((friend) => friend.id !== action.payload.relationshipId),
      };
    case GOT_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}

export default usersReducer;
