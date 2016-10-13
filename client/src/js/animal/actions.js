import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { genericFetch, fetchJson, catchFetch } from '../helpers/util';
import * as dialogActions from '../dialog/actions';

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

export const CREATE_ANIMAL_SUCCESS = 'animal/CREATE_SUCCESS';
function animalSaveSuccess(animal) {
	return newAnimal => {
		animal.Id = newAnimal.Id;
		return {
			type: CREATE_ANIMAL_SUCCESS,
			payload: {
				animal
			}
		}
	}
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

export function closeAnimalDialog(component) {
	return dialogActions.closeDialog({props: {fullDialog: true, open: false}}, component);
}

export function createAnimal(animal) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Animal saved with success!'
		};
		let params = {
			method: 'post',
			url: `${urls.api}/costumer/dog`,
			data: JSON.stringify(animal)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView],
			fetchErrorActions: [openMessageView],
			successActions: [openMessageView.bind(null, successActionPayload), animalSaveSuccess(animal)]
		});
	}
}