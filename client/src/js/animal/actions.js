import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { genericFetch, fetchJson, catchFetch } from '../helpers/util';

export const FETCH_ANIMALS = 'animal/FETCH';
export const FETCH_ANIMALS_SUCCESS = 'animal/FETCH_SUCCESS';
function animalSuccess(animals) {
	return {
		type: FETCH_ANIMALS_SUCCESS,
		payload: {
			animals
		}
	};
}

export const FETCH_ANIMALS_FAILURE = 'animal/FETCH_FAILURE';
function animalsError({ type, message }) {
	return {
		type: FETCH_ANIMALS_FAILURE,
		payload: { type, message }
	};
}

export function fetchAnimals(costumerId, fetchUrl) {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { url: `${urls.api}${fetchUrl}${costumerId}` },
			businessErrorActions: [ openMessageView, animalsError ],
			fetchErrorActions: [ openMessageView, animalsError ],
			successActions: [animalSuccess]
		});
	};
}