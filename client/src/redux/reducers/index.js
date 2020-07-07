import { combineReducers } from 'redux';
import sessionReducer from './session';
import loadersReducer from './loaders';
import errorsReducer from './errors';

const rootReducer = combineReducers({
  session: sessionReducer,
  loaders: loadersReducer,
  errors: errorsReducer,
});

export default rootReducer;
