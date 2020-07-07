import { GOT_DMS } from '../actions/channelActions';

const initState = {
  currentChannelId: null,
  dms: [],
};

const channelReducer = (state = initState, action) =>
{
  switch (action.type)
  {
    case GOT_DMS:
      return { ...state, dms: action.payload };
    default:
      return state;
  }
}

export default channelReducer;
