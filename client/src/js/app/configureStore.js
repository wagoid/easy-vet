import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './mainReducer';


export const store = createStore(mainReducer, {}, applyMiddleware(thunk));