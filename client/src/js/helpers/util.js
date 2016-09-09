import axios from 'axios';
import { push } from 'react-router-redux';

export const SNACKBAR_HEIGHT = 48;
export const FLOATING_BUTTON_BOTTOM = 20;

const UNAUTHORIZED_STATUS = 401;

export function floatingActionStyles(hasOpenMessage) {
	return {
		position: 'fixed',
		right: 20,
		bottom: hasOpenMessage && window.screen.width < 768? SNACKBAR_HEIGHT + 10 : FLOATING_BUTTON_BOTTOM,
		zIndex: 100
	};
}

export function additionalFloatingActionStyles() {
	return {
		position: 'relative',
		top: '30px',
		right: '70px',
		width: '56px',
		height: '56px',
		boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 2px 3px, rgba(0, 0, 0, 0.227451) 0px 2px 3px'
	};
}

export function genericFetch(dispatch, config = {}) {
	return axios(config.params)
		.then(response => {
			if (response.data.Message) {
				var firstMessageSentence = response.data.Message.split('.').shift();
				let errorPayload = { type: response.data.Type, text: firstMessageSentence };
				dispatchActions(dispatch, errorPayload, ...config.businessErrorActions);
			} else {
				dispatchActions(dispatch, response.data.Data, ...config.successActions);
			}

			return response.data.Data;
		})
		.catch(catchFetch(dispatch, ...config.fetchErrorActions));
}

export function catchFetch(dispatch, ...actionsToDispatch) {
	return error => {
		console.log(error, error.stack);
		let payload = {
			type:  ~error.message.indexOf('Network Error')? 'FetchError' : error.name,
			text: ~error.message.indexOf('Network Error')? 'Failed to retrieve data from server' : error.message
		};
		actionsToDispatch.forEach(actionMethod => dispatch(actionMethod(payload)));
		if (error.response && error.response.status === UNAUTHORIZED_STATUS) {
			dispatch(push('/login'));
		}
	};
}

export function dispatchActions(dispatch, payload, ...actions) {
	actions.forEach(action => dispatch(action(payload)));
}


export function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function isNumber(value) {
	return typeof value === 'number';
}

export function isString(value) {
	return typeof value === 'string';
}