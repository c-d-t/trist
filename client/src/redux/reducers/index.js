import { combineReducers } from 'redux';
import sessionReducer from './session';
import loadersReducer from './loaders';
import errorsReducer from './errors';
import channelReducer from './channel';

const rootReducer = combineReducers({
  session: sessionReducer,
  loaders: loadersReducer,
  errors: errorsReducer,
  channel: channelReducer,
});

export default rootReducer;
