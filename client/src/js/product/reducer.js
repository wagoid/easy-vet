import * as actions from './actions';

export default function reducer(state = {}, action = {}) {
	const { type, payload } = action;
	let newState = state;

	switch (type) {
		case actions.FETCH_PRODUCTS_SUCCESS:
			newState = payload;
			break;

<<<<<<< HEAD
		case actions.CREATE_PRODUCT_SUCCESS:
			newState.products = [ ...state.products, payload.product];
			break;

=======
>>>>>>> c483c15918e160f3404d49ceaceeb95091fa96e6
		default:
			newState = state;
			break;
	}

	return newState;
}