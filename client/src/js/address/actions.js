import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { genericFetch, fetchJson, catchFetch } from '../helpers/util';

const FETCH_ADDRESSES = 'address/FETCH';
const FETCH_ADDRESSES_SUCCESS = 'address/FETCH_SUCCESS';
function addressSuccess(addresses) {
	return {
		type: FETCH_ADDRESSES_SUCCESS,
		payload: {
			addresses
		}
	}
}
const FETCH_ADDRESSES_FAILURE = 'address/FETCH_FAILURE';
function addressesError({ type, message }) {
	return {
		type: FETCH_ADDRESSES_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export function fetchAddresses() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			url: `${urls.api}/address`,
			businessErrorActions: [ openMessageView, addressesError ],
			fetchErrorActions: [ openMessageView, addressesError ],
			successActions: [addressSuccess]
		});
	}
}