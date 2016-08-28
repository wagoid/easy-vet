const FAILURE_SUFFIX = '_FAILURE';

export default function mainReducer(state = {}, action = {}) {
	
	if (~action.type.indexOf(FAILURE_SUFFIX)) {
		state.message = {
			open: true,
			type: action.payload.type,
			text: action.payload.message
		}
	} else {
		state.message = {};
	}

	return state;
};