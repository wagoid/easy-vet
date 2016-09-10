import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';

export const FETCH_PRODUCTS = 'product/FETCH';
export const FETCH_PRODUCTS_SUCCESS = 'product/FETCH_SUCCESS';
function productsSuccess(products) {
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
export const CREATE_PRODUCT = 'product/CREATE';

export const CREATE_PRODUCT_SUCCESS = 'product/CREATE_SUCCESS';
function productSaveSuccess(product) {
	let actionToUse = product.Id > 0? UPDATE_PRODUCT_SUCCESS : CREATE_PRODUCT_SUCCESS;
	return productId => {
		product.Id = productId;
		return {
			type: actionToUse,
			payload: {
				product
			}
		}
	}
}


export const CREATE_PRODUCT_FAILURE = 'product/CREATE_FAILURE';
function productsCreateError({ type, message }) {
	return {
		type: CREATE_PRODUCT_FAILURE,
		payload: {
			type,
			message
		}
	}
}

const READ_PRODUCT = 'product/READ';
const READ_PRODUCT_SUCCESS = 'product/READ_SUCCESS';
const READ_PRODUCT_FAILURE = 'product/READ_FAILURE';

export const UPDATE_PRODUCT = 'product/UPDATE';
export const UPDATE_PRODUCT_SUCCESS = 'product/UPDATE_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'product/UPDATE_FAILURE';

const REMOVE_PRODUCT = 'product/REMOVE';
const REMOVE_PRODUCT_SUCCESS = 'product/REMOVE_SUCCESS';
const REMOVE_PRODUCT_FAILURE = 'product/REMOVE_FAILURE';

export function fetchproducts() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/product/all`},
			businessErrorActions: [openMessageView, productsError],
			fetchErrorActions: [openMessageView, productsError],
			successActions: [productsSuccess]
		});
	}
}

export function createProduct(product) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'product saved with success!'
		};
		let params = {
			method:  product.Id > 0? 'put' : 'post',
			url: `${urls.api}/product`,
			data: JSON.stringify(product)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, productsCreateError],
			fetchErrorActions: [openMessageView, productsCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), productSaveSuccess(product)]
		});
	}
}