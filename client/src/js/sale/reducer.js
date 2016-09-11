import * as actions from './actions';

//TODO: remove the hard coded sale
let defaultState = {
	sales: []
};

export default function reducer(state = defaultState, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_SALES_SUCCESS:
			newState = { ...state, sales: action.payload.sales }
			break;

		case actions.CREATE_SALE_SUCCESS:
			newState = { ...state, sales: [ ...state.sales, payload.sale] };
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}