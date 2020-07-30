import { GOT_DMS, GOT_OPEN_CHANNELS, OPENED_CHANNEL, CLOSED_CHANNEL, GOT_MESSAGE } from '../actions/channelActions';

const initState = {
  currentChannel: null,
  dms: [],
  openChannels: [],
  messages: {},
};

const channelReducer = (state = initState, action) =>
{
  switch (action.type)
  {
    case GOT_DMS:
      return { ...state, dms: action.payload };
    case GOT_OPEN_CHANNELS:
      return { ...state, openChannels: action.payload };
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
      let channelMessages = [message, ...state.messages[message.channelId]];
      if (channelMessages.length > 100)
      {
        channelMessages.pop();
      }
      return {
        ...state,
        messages: {
          ...state.channels,
          [message.channelId]: channelMessages, 
        }
      }
    default:
      return state;
  }
}

export default channelReducer;
