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
	return fetchJson(config.url)
		.then(json => {
			if (json.Message) {
				let errorPayload = { type: json.Type, text: json.Message };
				dispatchErrorActions(dispatch, errorPayload, ...config.businessErrorActions);
			} else {
				dispatch(config.successAction(json.Data))
			}
		})
		.catch(catchFetch(dispatch, ...config.fetchErrorActions));
}

export function catchFetch(dispatch, ...actionsToDispatch) {
	return error => {
		console.log(error, error.stack);
		let payload = {
			type:  ~error.message.indexOf('fetch')? 'FetchError' : error.name,
			text: ~error.message.indexOf('fetch')? 'Failed to retrieve data from server' : error.message
		};
		actionsToDispatch.forEach(actionMethod => dispatch(actionMethod(payload)));
	};
}

export function dispatchErrorActions(dispatch, errorPayload, ...errorActions) {
	errorActions.forEach(erroAction => dispatch(errorAction(errorPayload)));
}

export function fetchJson(url) {
	return fetch(url)
		.then(response =>  {
			return response.json()
		});
}