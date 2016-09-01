import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_ADDRESSES_SUCCESS:
			newState = payload;
			break;

		case actions.FETCH_ADDRESSES_FAILURE:
			newState = payload;
			break

		default:
			newState = state;
			break;
	}

	return newState;
}