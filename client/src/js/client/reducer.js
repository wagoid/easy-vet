import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_CLIENTS_SUCCESS:
			newState = payload;
			break;

		case actions.CREATE_CLIENTS_SUCCESS:
			newState.clients = [ ...state.clients, payload.client];
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}