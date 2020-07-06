import { combineReducers } from 'redux';
import sessionReducer from './session';
import loadersReducer from './loaders';

const rootReducer = combineReducers({
  session: sessionReducer,
  loaders: loadersReducer,
});

export default rootReducer;
