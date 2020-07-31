import { CREATE_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/notificationActions';

const initState = {
  id: null,
  message: '',
};

const errorsReducer = (state = initState, action) => {
  switch (action.type)
  {
    case CREATE_NOTIFICATION:
      return { id: action.payload.id, message: action.payload.message };
    case CLEAR_NOTIFICATION:
      if (!!action.payload.any || state.id === action.payload.id)
      {
        return { id: null, message: '' };
      }
      return state;
    default:
      return state;
  }
};

export default errorsReducer;
