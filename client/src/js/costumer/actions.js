import React from 'react';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';
import * as dialogActions from '../dialog/actions';
import Dialog from '../animal/Dialog';

export const FETCH_COSTUMERS = 'costumer/FETCH';
export const FETCH_COSTUMERS_SUCCESS = 'costumer/FETCH_SUCCESS';
function costumersSuccess(costumers) {
	return {
		type: FETCH_COSTUMERS_SUCCESS,
		payload: {
			costumers
		}
	}
}

export const FETCH_COSTUMERS_FAILURE = 'costumer/FETCH_FAILURE';
function costumersError({ type, message }) {
	return {
		type: FETCH_COSTUMERS_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const CREATE_COSTUMERS = 'costumer/CREATE';

export const CREATE_COSTUMER_SUCCESS = 'costumer/CREATE_SUCCESS';
function costumerSaveSuccess(costumer) {
	let actionToUse = costumer.Id > 0? UPDATE_COSTUMER_SUCCESS : CREATE_COSTUMER_SUCCESS;
	return newCostumer => {
		if (actionToUse === CREATE_COSTUMER_SUCCESS) {
			costumer.Id = newCostumer.Id;
			costumer.Address = newCostumer.Address;
		}
		return {
			type: actionToUse,
			payload: {
				costumer
			}
		}
	}
}


export const CREATE_COSTUMER_FAILURE = 'costumer/CREATE_FAILURE';
function costumersCreateError({ type, message }) {
	return {
		type: CREATE_COSTUMER_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const UPDATE_COSTUMER = 'costumer/UPDATE';
export const UPDATE_COSTUMER_SUCCESS = 'costumer/UPDATE_SUCCESS';
export const UPDATE_COSTUMER_FAILURE = 'costumer/UPDATE_FAILURE';

const REMOVE_COSTUMER = 'costumer/REMOVE';
const REMOVE_COSTUMER_SUCCESS = 'costumer/REMOVE_SUCCESS';
const REMOVE_COSTUMER_FAILURE = 'costumer/REMOVE_FAILURE';

export function fetchCostumers() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/costumer`},
			businessErrorActions: [openMessageView, costumersError],
			fetchErrorActions: [openMessageView, costumersError],
			successActions: [costumersSuccess]
		});
	}
}

export function createCostumer(costumer) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Costumer saved with success!'
		};
		let params = {
			method:  costumer.Id > 0? 'put' : 'post',
			url: `${urls.api}/costumer`,
			data: JSON.stringify(costumer)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, costumersCreateError],
			fetchErrorActions: [openMessageView, costumersCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), costumerSaveSuccess(costumer)]
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
					actions: [<FlatButton key={1} label='OK' primary onTouchTap={dispatchCloseDialog(dispatch, Dialog)} />]
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