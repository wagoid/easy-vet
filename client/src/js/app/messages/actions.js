export const CLOSE_MESSAGE_VIEW = 'messageview/CLOSE';
function closeMessageViewAction () {
	return {
		type: CLOSE_MESSAGE_VIEW,
		payload: {
			open: false
		}
	};
}

export const OPEN_MESSAGE_VIEW = 'messageview/OPEN';
function openMessageViewAction({type, text}) {
	return {
		type: OPEN_MESSAGE_VIEW,
		payload: {
			open: true,
			type,
			text
		}
	};
}

export function closeMessageView() {
	return (dispatch, getState) => {
		return dispatch(closeMessageViewAction());
	};
}

export function openMessageView(...args) {
	return (dispatch, getState) => {
		return dispatch(openMessageViewAction(...args));
	};
}