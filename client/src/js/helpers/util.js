import axios from 'axios';

export const SNACKBAR_HEIGHT = 48;
export const FLOATING_BUTTON_BOTTOM = 20;

export function floatingActionStyles(hasOpenMessage) {
	return {
		position: 'fixed',
		right: 20,
		bottom: hasOpenMessage && window.screen.width < 768? SNACKBAR_HEIGHT + 10 : FLOATING_BUTTON_BOTTOM,
		zIndex: 100
	};
}

export function genericFetch(dispatch, config = {}) {
	return axios(config.params)
		.then(response => {
			if (response.data.Message) {
				var firstMessageSentence = response.data.Message.split('.').shift();
				let errorPayload = { type: response.data.Type, text: firstMessageSentence };
				dispatchErrorActions(dispatch, errorPayload, ...config.businessErrorActions);
			} else {
				dispatch(config.successAction(response.data.Data))
			}
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
	};
}

export function dispatchErrorActions(dispatch, errorPayload, ...errorActions) {
	errorActions.forEach(errorAction => dispatch(errorAction(errorPayload)));
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