import { CLOSE_MESSAGE_VIEW, OPEN_MESSAGE_VIEW } from './messages/actions';

const initialState = {
	message: {
		open: false
	}
};

export default function mainReducer(state = initialState, action = {}) {
	let newState = state;
	switch (action.type) {
		case OPEN_MESSAGE_VIEW:
		case CLOSE_MESSAGE_VIEW:
			newState  = { ...state, message: action.payload };
			break;

		default:
				newState = state;
			break;
	}

	return newState;
}