import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_STOCKS_SUCCESS:
			newState = payload;
			break;

		case actions.CREATE_STOCK_SUCCESS:
			newState.stocks = [ ...state.stocks, payload.stock];
			break;

		default:
			newState = state;
			break;
	}

	return newState;
}