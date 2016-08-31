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

export function catchFetch(dispatch, ...actionsToDispatch) {
	return error => {
		let payload = {
			type: 'FetchError',
			text: error.message.indexOf('fetch')? 'Failed to retrieve data from server' : error.message
		};
		actionsToDispatch.forEach(actionMethod => dispatch(actionMethod(payload)));
	};
}

export function dispatchErrorActions(dispatch, errorPayload, ...errorActions) {
	errorActions.forEach(erroAction => dispatch(errorAction(errorPayload)));
}

export function fetchJson(config) {
	return fetch(config)
		.then(response => response.json());
}