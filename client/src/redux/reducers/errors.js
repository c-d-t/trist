import { FORM_ERROR } from '../actions/errorActions';

const initState = {
  formErrors: null,
};

const errorsReducer = (state = initState, action) => {
  switch (action.type)
  {
    case FORM_ERROR:
      return { ...state, formErrors: action.errors };
    default:
      return state;
  }
};

export default errorsReducer;
