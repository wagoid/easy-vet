import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, fetchJson } from '../helpers/util';

export const FETCH_EMPLOYEES = 'employee/FETCH';
export const FETCH_EMPLOYEES_SUCCESS = 'employee/FETCH_SUCCESS';
function employeesSuccess(employees) {
	return {
		type: FETCH_EMPLOYEES_SUCCESS,
		payload: {
			employees
		}
	}
}
export const FETCH_EMPLOYEES_FAILURE = 'employee/FETCH_FAILURE';
function employeesError({ type, message }) {
	return {
		type: FETCH_EMPLOYEES_FAILURE,
		payload: {
			type,
			message
		}
	}
}

//Make the others down there
const CREATE_EMPLOYEE = 'employee/CREATE';
const CREATE_EMPLOYEE_SUCCESS = 'employee/CREATE_SUCCESS';
const CREATE_EMPLOYEE_FAILURE = 'employee/CREATE_FAILURE';

const READ_EMPLOYEE = 'employee/READ';
const READ_EMPLOYEE_SUCCESS = 'employee/READ_SUCCESS';
const READ_EMPLOYEE_FAILURE = 'employee/READ_FAILURE';

const UPDATE_EMPLOYEE = 'employee/UPDATE';
const UPDATE_EMPLOYEE_SUCCESS = 'employee/UPDATE_SUCCESS';
const UPDATE_EMPLOYEE_FAILURE = 'employee/UPDATE_FAILURE';

const REMOVE_EMPLOYEE = 'employee/REMOVE';
const REMOVE_EMPLOYEE_SUCCESS = 'employee/REMOVE_SUCCESS';
const REMOVE_EMPLOYEE_FAILURE = 'employee/REMOVE_FAILURE';

export function fetchEmployees() {
	return (dispatch, getState) => {
		return fetchJson(`${urls.api}/employee/all`)
			.then(json => {
				if (json.Message) {
					let errorPayload = { type: json.Type, text: json.Message };
					dispatchErrorActions(dispatch, errorPayload, openMessageView, employeesError);
				} else {
					dispatch(employeesSuccess(json.Data))
				}
			})
			.catch(catchFetch(dispatch, employeesError, openMessageView));
	}
}