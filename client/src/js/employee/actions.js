import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';
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
export const CREATE_EMPLOYEE = 'employee/CREATE';

export const CREATE_EMPLOYEE_SUCCESS = 'employee/CREATE_SUCCESS';
function employeeSaveSuccess(employee) {
	let actionToUse = employee.Id > 0? UPDATE_EMPLOYEE_SUCCESS : CREATE_EMPLOYEE_SUCCESS;
	return employeeId => {
		employee.Id = employeeId;
		return {
			type: actionToUse,
			payload: {
				employee
			}
		}
	}
}


export const CREATE_EMPLOYEE_FAILURE = 'employee/CREATE_FAILURE';
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

export const UPDATE_EMPLOYEE = 'employee/UPDATE';
export const UPDATE_EMPLOYEE_SUCCESS = 'employee/UPDATE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'employee/UPDATE_FAILURE';

const REMOVE_EMPLOYEE = 'employee/REMOVE';
const REMOVE_EMPLOYEE_SUCCESS = 'employee/REMOVE_SUCCESS';
const REMOVE_EMPLOYEE_FAILURE = 'employee/REMOVE_FAILURE';

export function fetchEmployees() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/employee/all`},
			businessErrorActions: [openMessageView, employeesError],
			fetchErrorActions: [openMessageView, employeesError],
			successActions: [employeesSuccess]
		});
	}
}

export function createEmployee(employee) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: 'Employee saved with success!'
		};
		let params = {
			method:  employee.Id > 0? 'put' : 'post',
			url: `${urls.api}/employee/${EMPLOYEE_TYPES[employee.Type].toLowerCase().replace(' ', '')}`,
			data: JSON.stringify(employee)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, employeesCreateError],
			fetchErrorActions: [openMessageView, employeesCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), employeeSaveSuccess(employee)]
		});
	}
}