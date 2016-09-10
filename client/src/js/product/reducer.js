import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_PRODUCTS_SUCCESS:
			newState = payload;
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}