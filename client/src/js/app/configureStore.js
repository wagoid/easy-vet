import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import mainReducer from './mainReducer';
import { routerReducer } from 'react-router-redux';

export const configureStore = function (initialState = {}) {
	const reducer = combineReducers({
		mainReducer,
		routing: routerReducer 
	});

	return  createStore(reducer, {}, applyMiddleware(thunk));
} 