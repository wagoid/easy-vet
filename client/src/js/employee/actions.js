import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch, objectToFormData } from '../helpers/util';
import { EMPLOYEE_TYPES } from '../helpers/valueDecode';

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
function employeesCreateSuccess({ type, message }) {
	return {
		type: CREATE_EMPLOYEE_SUCCESS,
		payload: {
			type,
			message
		}
	}
}


const CREATE_EMPLOYEE_FAILURE = 'employee/CREATE_FAILURE';
function employeesCreateError({ type, message }) {
	return {
		type: CREATE_EMPLOYEE_FAILURE,
		payload: {
			type,
			message
		}
	}
}

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
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/employee/all`},
			businessErrorActions: [openMessageView, employeesError],
			fetchErrorActions: [openMessageView, employeesError],
			successAction: employeesSuccess
		});
	}
}

export function createEmployee(employee) {
	var headers = new Headers();
	headers.set('accept', 'application/json');
	headers.set('content-type', 'application/json');
	return (dispatch, getState) => {
		let params = {
			method: 'post',
			url: `${urls.api}/employee/${EMPLOYEE_TYPES[employee.Type].toLowerCase().replace(' ', '')}`,
			data: JSON.stringify(employee)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, employeesCreateError],
			fetchErrorActions: [openMessageView, employeesCreateError],
			successAction: employeesCreateSuccess
		});
	}
}