import * as actions from './actions';

export default function dialogReducer(state = {}, action = {}) {
	let newState;
	
	switch (action.type) {
		case actions.OPEN:
			newState = { ...state, ...action.payload };
			break;
		case actions.CLOSE:
			newState = {};
			break;
		default:
				newState = state;
			break;
	}

	return newState;
}