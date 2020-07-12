import { GOT_DMS, OPENED_CHANNEL } from '../actions/channelActions';

const initState = {
  currentChannelId: null,
  dms: [],
  channels: {},
};

const channelReducer = (state = initState, action) =>
{
  switch (action.type)
  {
    case GOT_DMS:
      return { ...state, dms: action.payload };
    case OPENED_CHANNEL:
      return {
        ...state,
        currentChannelId: action.payload.channelId,
        channels: { ...state.channels, [action.payload.channelId]: action.payload.messages
      }};
    default:
      return state;
  }
}

export default channelReducer;
