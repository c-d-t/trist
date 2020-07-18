import { GOT_DMS, OPENED_CHANNEL, CLOSED_CHANNEL, GOT_MESSAGE } from '../actions/channelActions';

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
    case CLOSED_CHANNEL:
      return {
        ...state,
        currentChannelId: null,
      }
    case GOT_MESSAGE:
      const { message } = action.payload;
      if (!state.channels[message.channelId]) return state;
      return {
        ...state,
        channels: {
          ...state.channels,
          [message.channelId]: [message, ...state.channels[message.channelId]], 
        }
      }
    default:
      return state;
  }
}

export default channelReducer;
