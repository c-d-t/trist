import { combineReducers } from 'redux';
import thisAccountReducer from './thisAccountReducer';

const rootReducer = combineReducers({
  thisAccount: thisAccountReducer,
});

export default rootReducer;
