import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';
import * as dialogActions from '../dialog/actions';
import Dialog from '../animal/Dialog';

export const FETCH_CLIENTS = 'client/FETCH';
export const FETCH_CLIENTS_SUCCESS = 'client/FETCH_SUCCESS';
function clientsSuccess(clients) {
	return {
		type: FETCH_CLIENTS_SUCCESS,
		payload: {
			clients
		}
	}
}

export const FETCH_CLIENTS_FAILURE = 'client/FETCH_FAILURE';
function clientsError({ type, message }) {
	return {
		type: FETCH_CLIENTS_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const CREATE_CLIENTS = 'client/CREATE';

export const CREATE_CLIENT_SUCCESS = 'client/CREATE_SUCCESS';
function clientSaveSuccess(client) {
	let actionToUse = client.Id > 0? UPDATE_CLIENT_SUCCESS : CREATE_CLIENT_SUCCESS;
	return clientId => {
		client.Id = clientId;
		return {
			type: actionToUse,
			payload: {
				client
			}
		}
	}
}


export const CREATE_CLIENT_FAILURE = 'client/CREATE_FAILURE';
function clientsCreateError({ type, message }) {
	return {
		type: CREATE_CLIENT_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const UPDATE_CLIENT = 'client/UPDATE';
export const UPDATE_CLIENT_SUCCESS = 'client/UPDATE_SUCCESS';
export const UPDATE_CLIENT_FAILURE = 'client/UPDATE_FAILURE';

const REMOVE_CLIENT = 'client/REMOVE';
const REMOVE_CLIENT_SUCCESS = 'client/REMOVE_SUCCESS';
const REMOVE_CLIENT_FAILURE = 'client/REMOVE_FAILURE';

export function fetchClients() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/client`},
			businessErrorActions: [openMessageView, clientsError],
			fetchErrorActions: [openMessageView, clientsError],
			successActions: [clientsSuccess]
		});
	}
}

export function createClient(client) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Client saved with success!'
		};
		let params = {
			method:  client.Id > 0? 'put' : 'post',
			url: `${urls.api}/client`,
			data: JSON.stringify(client)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, clientsCreateError],
			fetchErrorActions: [openMessageView, clientsCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), clientSaveSuccess(client)]
		});
	}
}

function dialogAction(dispatch) {
	return ({ type, text }) => {
		return {
			type: dialogActions.OPEN,
			payload: {
				component: Dialog,
				props: {
					message: text,
					title: "Failed to login",
					open: true,
					onRequestClose: dispatchCloseDialog(dispatch, Dialog),
					actions: [<FlatButton key={1} label="OK" primary={true} onTouchTap={dispatchCloseDialog(dispatch, Dialog)} />]
				}
			}
		};
	};
}

function dispatchCloseDialog(dispatch, component) {
	return () => { 
		dispatch(dialogActions.closeDialog({}, component))
	};
}