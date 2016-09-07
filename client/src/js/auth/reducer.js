import * as actions from './actions';

export default function authReducer(state = {}, action = {}) {
	let newState = state;
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			newState  = { ...state, ...action.payload };
			localStorage.setItem("authToken", JSON.stringify(newState.authToken));
			break;

		default:
				newState = state;
			break;
	}

	return newState;
}