import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import apiAction from './middleware/apiAction';

const store = createStore(rootReducer, applyMiddleware(apiAction));

export default store;
