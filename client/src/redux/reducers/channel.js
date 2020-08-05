import { GOT_DMS, GOT_OPEN_CHANNELS, OPENED_CHANNEL, CLOSED_CHANNEL, GOT_MESSAGE } from '../actions/channelActions';

const initState = {
  lastChannel: null,
  currentChannel: {
    id: null,
  },
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
        lastChannel: state.currentChannel,
        currentChannel: action.payload.channel,
        messages: {
          ...state.channels, [action.payload.channel.id]: action.payload.messages,
      }};
    case CLOSED_CHANNEL:
      return {
        ...state,
        lastChannel: null,
        currentChannel: {
          id: null,
        },
      }
    case GOT_MESSAGE:
      let channelMessages;
      const { message } = action.payload;

      if (message.system && state.currentChannel && state.messages[state.currentChannel.id]) {
        channelMessages = [message, ...state.messages[state.currentChannel.id]];
        if (channelMessages.length > 100)
        {
          channelMessages.pop();
        }
        return  {
          ...state,
          messages: {
            ...state.messages,
            [state.currentChannel.id]: channelMessages,
          },
        }
      }

      if (!state.messages[message.channelId]) {
        return state;
      }

      channelMessages = [message, ...state.messages[message.channelId]];
      if (channelMessages.length > 100)
      {
        channelMessages.pop();
      }
      return {
        ...state,
        messages: {
          ...state.messages,
          [message.channelId]: channelMessages, 
        }
      }
    default:
      return state;
  }
}

export default channelReducer;
