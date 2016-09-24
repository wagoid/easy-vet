import React from 'react';
import { genericFetch } from '../helpers/util';
import * as urls from '../app/config/urls';
import * as dialogActions from '../dialog/actions';
import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';
import { openMessageView } from '../app/messages/actions';

export const LOGIN = 'auth/LOGIN';
function login(userInfo) {
	return {
		type: LOGIN,
		payload: { userInfo }
	};
}

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
function loginsuccess(response) {
		return {
			type: LOGIN_SUCCESS,
			payload: response
		};
}

export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
function loginFailure({ type, text }) {
	return {
		type: LOGIN_FAILURE,
		payload: { type, text }
	};
}



export const SIGNUP = 'auth/SIGNUP';
function signup(userName, password) {
	return {
		type: SIGNUP,
		payload: { userName, password }
	};
}

export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
function signupSuccess() {
	return {
		type: SIGNUP_SUCCESS,
		payload: {}
	};
}
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
function signupFailure({ type, text }) {
	return {
		type: SIGNUP_FAILURE, payload: { type, text }
	};
}

function dialogAction(dispatch) {
	return ({ type, text }) => {
		return {
			type: dialogActions.OPEN,
			payload: {
				component: Dialog,
				componentProps: {
					message: text,
				},
				props: {
					title: "Failed to login",
					open: true,
					onRequestClose: dispatchCloseDialog(dispatch, Dialog),
					actions: [<FlatButton key={"loginFailedOk"} label="OK" primary={true} onTouchTap={dispatchCloseDialog(dispatch, Dialog)} />]
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

function openSuccessMessage() {
	return openMessageView({ type: 'LoginSuccess', text: 'Login accomplished with success!' });
}

export function requestLogin(userInfo) {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'post', url: `${urls.api}/auth/login`, data: userInfo },
			businessErrorActions: [loginFailure, dialogAction(dispatch)],
			fetchErrorActions: [loginFailure, dialogAction(dispatch)],
			successActions: [loginsuccess, openSuccessMessage]
		});
	}
}

