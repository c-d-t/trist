import { CONNECT, DISCONNECT } from '../actions/connectionActions';

const init = {
  connected: false,
}

const connectionReducer = (state = init, action) => {
  switch(action.type)
  {
    case CONNECT:
      return {
        connected: true,
      };
    case DISCONNECT:
      return {
        connected: false,
      };
    default:
      return state;
  }
};

export default connectionReducer;
