import * as actions from './actions';

let defaultState = {
	appointments: []
}
export default function reducer(state = defaultState, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_APPOINTMENTS_SUCCESS:
			newState = { ...state, appointments: action.payload.appointments };
			break;

		case actions.CREATE_APPOINTMENT_SUCCESS:
			newState.appointments = [ ...state.appointments, payload.appointment];
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}