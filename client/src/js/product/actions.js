import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { genericFetch, fetchJson, catchFetch } from '../helpers/util';

export const FETCH_PRODUCTS = 'product/FETCH';
export const FETCH_PRODUCTS_SUCCESS = 'product/FETCH_SUCCESS';
function productSuccess(products) {
	return {
		type: FETCH_PRODUCTS_SUCCESS,
		payload: {
			products
		}
	}
}
export const FETCH_PRODUCTS_FAILURE = 'product/FETCH_FAILURE';
function productsError({ type, message }) {
	return {
		type: FETCH_PRODUCTS_FAILURE,
		payload: {
			type,
			message
		}
	}
}

//Make the others down there
const CREATE_EMPLOYEE = 'product/CREATE';
const CREATE_EMPLOYEE_SUCCESS = 'product/CREATE_SUCCESS';
const CREATE_EMPLOYEE_FAILURE = 'product/CREATE_FAILURE';

const READ_EMPLOYEE = 'product/READ';
const READ_EMPLOYEE_SUCCESS = 'product/READ_SUCCESS';
const READ_EMPLOYEE_FAILURE = 'product/READ_FAILURE';

const UPDATE_EMPLOYEE = 'product/UPDATE';
const UPDATE_EMPLOYEE_SUCCESS = 'product/UPDATE_SUCCESS';
const UPDATE_EMPLOYEE_FAILURE = 'product/UPDATE_FAILURE';

const REMOVE_EMPLOYEE = 'product/REMOVE';
const REMOVE_EMPLOYEE_SUCCESS = 'product/REMOVE_SUCCESS';
const REMOVE_EMPLOYEE_FAILURE = 'product/REMOVE_FAILURE';

export function fetchProducts() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			url: `${urls.api}/sale/product`,
			businessErrorActions: [ openMessageView, productsError ],
			fetchErrorActions: [ openMessageView, productsError ],
			successAction: productSuccess
		});
	}
}