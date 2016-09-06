import { genericFetch } from '../helpers/util';
import * as urls from '../app/config/urls';

export const LOGIN = 'auth/LOGIN';
function login(userInfo) {
	return {
		type: LOGIN,
		payload: { userInfo }
	};
}

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
function loginsuccess(userInfo) {
	return newUserInfo => {
		userInfo.Password = newUserInfo.Password;
		return {
			type: LOGIN_SUCCESS,
			payload: newUserInfo
		};
	};
}

export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
function loginFailure({ type, message }) {
	return {
		type: LOGIN_FAILURE,
		payload: { type, message }
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
function signupFailure({ type, message }) {
	return {
		type: SIGNUP_FAILURE, payload: { type, message }
	};
}

export function requestLogin(userInfo) {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'post', url: `${urls.api}/auth/login`, data: userInfo },
			businessErrorActions: [loginFailure],
			fetchErrorActions: [loginFailure],
			successActions: [loginsuccess(userInfo)]
		});
	}
}

