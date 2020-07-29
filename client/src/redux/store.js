import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import apiAction from './middleware/apiAction';
import asyncAction from './middleware/asyncAction';

const store = createStore(rootReducer, applyMiddleware(asyncAction, apiAction));

export default store;
