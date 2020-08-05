import { combineReducers } from 'redux';
import { LOGGED_OUT } from '../actions/sessionActions';
import sessionReducer from './session';
import loadersReducer from './loaders';
import errorsReducer from './errors';
import channelReducer from './channel';
import usersReducer from './users';
import notificationReducer from './notifications';
import connectionReducer from './connection';

const appReducer = combineReducers({
  session: sessionReducer,
  loaders: loadersReducer,
  errors: errorsReducer,
  channel: channelReducer,
  users: usersReducer,
  notifications: notificationReducer,
  connection: connectionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGGED_OUT) {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer;
