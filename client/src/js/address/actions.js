import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, fetchJson } from '../helpers/util';

export const FETCH_ADDRESSES = 'address/FETCH';
export const FETCH_ADDRESSES_SUCCESS = 'address/FETCH_SUCCESS';
function addressSuccess(addresses) {
	return {
		type: FETCH_ADDRESSES_SUCCESS,
		payload: {
			addresses
		}
	}
}
export const FETCH_ADDRESSES_FAILURE = 'address/FETCH_FAILURE';
function addressesError({ type, message }) {
	return {
		type: FETCH_ADDRESSES_FAILURE,
		payload: {
			type,
			message
		}
	}
}

//Make the others down there
const CREATE_EMPLOYEE = 'address/CREATE';
const CREATE_EMPLOYEE_SUCCESS = 'address/CREATE_SUCCESS';
const CREATE_EMPLOYEE_FAILURE = 'address/CREATE_FAILURE';

const READ_EMPLOYEE = 'address/READ';
const READ_EMPLOYEE_SUCCESS = 'address/READ_SUCCESS';
const READ_EMPLOYEE_FAILURE = 'address/READ_FAILURE';

const UPDATE_EMPLOYEE = 'address/UPDATE';
const UPDATE_EMPLOYEE_SUCCESS = 'address/UPDATE_SUCCESS';
const UPDATE_EMPLOYEE_FAILURE = 'address/UPDATE_FAILURE';

const REMOVE_EMPLOYEE = 'address/REMOVE';
const REMOVE_EMPLOYEE_SUCCESS = 'address/REMOVE_SUCCESS';
const REMOVE_EMPLOYEE_FAILURE = 'address/REMOVE_FAILURE';

export function fetchEmployees() {
	return (dispatch, getState) => {
		return fetchJson(`${urls.api}/address`)
			.then(json => {
				if (json.Message) {
					let errorPayload = { type: json.Type, text: json.Message };
					dispatchErrorActions(dispatch, errorPayload, openMessageView, addressesError);
				} else {
					dispatch(addressSuccess(json.Data))
				}
			})
			.catch(catchFetch(dispatch, addressesError, openMessageView));
	}
}