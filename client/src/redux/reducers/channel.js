import { GOT_DMS, OPENED_CHANNEL, CLOSED_CHANNEL, GOT_MESSAGE } from '../actions/channelActions';

const initState = {
  currentChannel: null,
  dms: [],
  messages: {},
};

const channelReducer = (state = initState, action) =>
{
  console.log(action)
  switch (action.type)
  {
    case GOT_DMS:
      return { ...state, dms: action.payload };
    case OPENED_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.channel,
        messages: {
          ...state.channels, [action.payload.channel.id]: action.payload.messages,
      }};
    case CLOSED_CHANNEL:
      return {
        ...state,
        currentChannel: null,
      }
    case GOT_MESSAGE:
      const { message } = action.payload;
      if (!state.messages[message.channelId]) return state;
      return {
        ...state,
        messages: {
          ...state.channels,
          [message.channelId]: [message, ...state.messages[message.channelId]], 
        }
      }
    default:
      return state;
  }
}

export default channelReducer;
