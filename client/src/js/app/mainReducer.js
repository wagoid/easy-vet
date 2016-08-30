import { CLOSE_MESSAGE_VIEW, OPEN_MESSAGE_VIEW } from './messages/actions';

export default function mainReducer(state = {}, action = {}) {

	switch (action.type) {
		case OPEN_MESSAGE_VIEW:
		case CLOSE_MESSAGE_VIEW:
			state.message = action.payload;
			break;

		default:
			if (!state.message) {
				state.message = {};
			}
			break;
	}

	return state;
};