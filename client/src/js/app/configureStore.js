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
import costumer from '../costumer/reducer';
import sale from '../sale/reducer';
import appointment from '../appointment/reducer';
import animal from '../animal/reducer';

export const configureStore = function (initialState = {}) {
	const reducer = combineReducers({
		routing: routerReducer,
		main,
		employee,
		address,
		auth,
		dialog,
		employee,
		costumer,
		address,
		sale,
		appointment,
		animal,
		product
	});

	return  createStore(reducer, applyMiddleware(thunk, routerMiddleware(browserHistory)));
}