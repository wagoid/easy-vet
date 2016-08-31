import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main from './mainReducer';
import employee from '../employee/reducer';
import address from '../address/reducer';

export const configureStore = function (initialState = {}) {
	const reducer = combineReducers({
		main,
		employee,
		address,
		routing: routerReducer 
	});

	return  createStore(reducer, applyMiddleware(thunk));
}