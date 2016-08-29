import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case actions.FETCH_EMPLOYEES_SUCCESS:
			return payload;

		case actions.FETCH_EMPLOYEES_FAILURE:
			return payload;

		default:
			return payload || state;
	}
}