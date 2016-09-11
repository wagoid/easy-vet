import * as actions from './actions';

let defaultState = {
	costumers: []
}
export default function reducer(state = defaultState, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_COSTUMERS_SUCCESS:
			newState = payload;
			break;

		case actions.CREATE_COSTUMER_SUCCESS:
			newState.costumers = [ ...state.costumers, payload.costumer];
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}