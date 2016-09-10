import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import main from './mainReducer';
import employee from '../employee/reducer';
import product from '../product/reducer';
import address from '../address/reducer';
import auth from '../auth/reducer';
import dialog from '../dialog/reducer';
import client from '../client/reducer';

export const configureStore = function (initialState = {}) {
	const reducer = combineReducers({
		main,
		employee,
		product,
		client,
		address,
		auth,
		dialog,
		routing: routerReducer
	});

	return  createStore(reducer, applyMiddleware(thunk, routerMiddleware(browserHistory)));
}