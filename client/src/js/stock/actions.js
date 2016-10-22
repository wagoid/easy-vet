import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';

export const FETCH_STOCKS = 'stock/FETCH';
export const FETCH_STOCKS_SUCCESS = 'stock/FETCH_SUCCESS';
function stocksSuccess(stocks) {
	return {
		type: FETCH_STOCKS_SUCCESS,
		payload: {
			stocks
		}
	}
}

export const FETCH_STOCKS_FAILURE = 'stock/FETCH_FAILURE';
function stocksError({ type, message }) {
	return {
		type: FETCH_STOCKS_FAILURE,
		payload: {
			type,
			message
		}
	}
}

//Make the others down there
export const CREATE_STOCK = 'stock/CREATE';

export const CREATE_STOCK_SUCCESS = 'stock/CREATE_SUCCESS';
function stockSaveSuccess(stock) {
	let actionToUse = stock.Id > 0? UPDATE_STOCK_SUCCESS : CREATE_STOCK_SUCCESS;
	return stock => {
		if (actionToUse === CREATE_STOCK_SUCCESS) {
			stock.Id = stock.Id;
		}
		return {
			type: actionToUse,
			payload: {
				stock
			}
		}
	}
}


export const CREATE_STOCK_FAILURE = 'stock/CREATE_FAILURE';
function stocksCreateError({ type, message }) {
	return {
		type: CREATE_STOCK_FAILURE,
		payload: {
			type,
			message
		}
	}
}

const READ_STOCK = 'stock/READ';
const READ_STOCK_SUCCESS = 'stock/READ_SUCCESS';
const READ_STOCK_FAILURE = 'stock/READ_FAILURE';

export const UPDATE_STOCK = 'stock/UPDATE';
export const UPDATE_STOCK_SUCCESS = 'stock/UPDATE_SUCCESS';
export const UPDATE_STOCK_FAILURE = 'stock/UPDATE_FAILURE';

const REMOVE_STOCK = 'stock/REMOVE';
const REMOVE_STOCK_SUCCESS = 'stock/REMOVE_SUCCESS';
const REMOVE_STOCK_FAILURE = 'stock/REMOVE_FAILURE';

export function fetchStocks() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/stock`},
			businessErrorActions: [openMessageView, stocksError],
			fetchErrorActions: [openMessageView, stocksError],
			successActions: [stocksSuccess]
		});
	}
}

export function createStock(stock) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Stock saved with success!'
		};
		let params = {
			method:  stock.Id > 0? 'put' : 'post',
			url: `${urls.api}/stock/add`,
			data: JSON.stringify(stock)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, stocksCreateError],
			fetchErrorActions: [openMessageView, stocksCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), stockSaveSuccess(stock)]
		});
	}
}

export function removeStock(stock) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Stock saved with success!'
		};
		let params = {
			method:  stock.Id > 0? 'put' : 'post',
			url: `${urls.api}/stock/remove`,
			data: JSON.stringify(stock)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, stocksCreateError],
			fetchErrorActions: [openMessageView, stocksCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), stockSaveSuccess(stock)]
		});
	}
}