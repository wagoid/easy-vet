export const SET_ADDITIONAL_FLOATING_ACTIONS = 'appbar/SET_ADDITIONAL_FLOATING_ACTIONS';


function setAdditionalActionsAction(additionalFloatingActions) {
	return {
		type: SET_ADDITIONAL_FLOATING_ACTIONS,
		payload: {
			additionalFloatingActions
		}
	};
}

export function setAdditionalFloatingActions(...args) {
	return (dispatch, getState) => {
		return dispatch(setAdditionalActionsAction(...args));
	};
}