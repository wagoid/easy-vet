import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';
import * as dialogActions from '../dialog/actions';

export const FETCH_SALES = 'sale/FETCH';
export const FETCH_SALES_SUCCESS = 'sale/FETCH_SUCCESS';
function salesSuccess(sales) {
	return {
		type: FETCH_SALES_SUCCESS,
		payload: {
			sales
		}
	}
}

export const FETCH_SALES_FAILURE = 'sale/FETCH_FAILURE';
function salesError({ type, message }) {
	return {
		type: FETCH_SALES_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const CREATE_SALES = 'sale/CREATE';

export const CREATE_SALE_SUCCESS = 'sale/CREATE_SUCCESS';
function saleCreateSuccess(sale) {
	return newSale => {
		sale.Id = newSale.Id;
		sale.SaleProducts = newSale.SaleProducts;
		return {
			type: CREATE_SALE_SUCCESS,
			payload: {
				sale
			}
		}
	}
}


export const CREATE_SALE_FAILURE = 'sale/CREATE_FAILURE';
function salesCreateError({ type, message }) {
	return {
		type: CREATE_SALE_FAILURE,
		payload: {
			type,
			message
		}
	}
}

const REMOVE_SALE = 'sale/REMOVE';
const REMOVE_SALE_SUCCESS = 'sale/REMOVE_SUCCESS';
const REMOVE_SALE_FAILURE = 'sale/REMOVE_FAILURE';

export function fetchSales() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/sale`},
			businessErrorActions: [openMessageView, salesError],
			fetchErrorActions: [openMessageView, salesError],
			successActions: [salesSuccess]
		});
	}
}

export function createSale(sale) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Sale saved with success!'
		};
		let params = {
			method: 'post',
			url: `${urls.api}/sale`,
			data: JSON.stringify(sale)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, salesCreateError],
			fetchErrorActions: [openMessageView, salesCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), saleCreateSuccess(sale)]
		});
	}
}