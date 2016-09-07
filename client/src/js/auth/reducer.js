import * as actions from './actions';

export default function authReducer(state = {}, action = {}) {
	let newState = state;
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			newState  = { ...state, userData: action.payload };
			localStorage.setItem("userData", JSON.stringify(newState.userData));
			break;

		default:
				newState = state;
			break;
	}

	return newState;
}