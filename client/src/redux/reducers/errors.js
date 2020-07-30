import { CLEAR_ERRORS, FORM_ERROR } from '../actions/errorActions';
import { SENT_FRIEND_REQUEST_FAILED } from '../actions/relationshipActions';

const initState = {
  formErrors: null,
};

const errorsReducer = (state = initState, action) => {
  switch (action.type)
  {
    case SENT_FRIEND_REQUEST_FAILED:
      return { ...state, formErrors: action.payload };
    case CLEAR_ERRORS:
      return initState;
    case FORM_ERROR:
      return { ...state, formErrors: action.errors };
    default:
      return state;
  }
};

export default errorsReducer;
