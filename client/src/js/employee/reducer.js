import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_EMPLOYEES_SUCCESS:
			newState = payload;
			break;

		case actions.CREATE_EMPLOYEE_SUCCESS:
			newState.employees = [ ...state.employees, payload.employee];
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}