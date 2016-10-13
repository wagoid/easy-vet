import { push } from 'react-router-redux';
import * as urls from '../app/config/urls';
import { openMessageView } from '../app/messages/actions';
import { catchFetch, dispatchErrorActions, genericFetch } from '../helpers/util';
import * as dialogActions from '../dialog/actions';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export const FETCH_APPOINTMENTS = 'appointment/FETCH';
export const FETCH_APPOINTMENTS_SUCCESS = 'appointment/FETCH_SUCCESS';
function appointmentsSuccess(appointments) {
	return {
		type: FETCH_APPOINTMENTS_SUCCESS,
		payload: {
			appointments
		}
	}
}

export const FETCH_APPOINTMENTS_FAILURE = 'appointment/FETCH_FAILURE';
function appointmentsError({ type, message }) {
	return {
		type: FETCH_APPOINTMENTS_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const CREATE_APPOINTMENTS = 'appointment/CREATE';

export const CREATE_APPOINTMENT_SUCCESS = 'appointment/CREATE_SUCCESS';
function appointmentSaveSuccess(appointment) {
	let actionToUse = appointment.Id > 0? UPDATE_APPOINTMENT_SUCCESS : CREATE_APPOINTMENT_SUCCESS;
	return newAppointment => {
		if (actionToUse === CREATE_APPOINTMENT_SUCCESS) {
			appointment.Id = newAppointment.Id;
			appointment.Address = newAppointment.Address;
		}
		return {
			type: actionToUse,
			payload: {
				appointment
			}
		}
	}
}


export const CREATE_APPOINTMENT_FAILURE = 'appointment/CREATE_FAILURE';
function appointmentsCreateError({ type, message }) {
	return {
		type: CREATE_APPOINTMENT_FAILURE,
		payload: {
			type,
			message
		}
	}
}

export const UPDATE_APPOINTMENT = 'appointment/UPDATE';
export const UPDATE_APPOINTMENT_SUCCESS = 'appointment/UPDATE_SUCCESS';
export const UPDATE_APPOINTMENT_FAILURE = 'appointment/UPDATE_FAILURE';

export const REMOVE_APPOINTMENT = 'appointment/REMOVE';
export const REMOVE_APPOINTMENT_SUCCESS = 'appointment/REMOVE_SUCCESS';
export const REMOVE_APPOINTMENT_FAILURE = 'appointment/REMOVE_FAILURE';

export function fetchAppointments() {
	return (dispatch, getState) => {
		return genericFetch(dispatch, {
			params: { method: 'get', url: `${urls.api}/appointment`},
			businessErrorActions: [openMessageView, appointmentsError],
			fetchErrorActions: [openMessageView, appointmentsError],
			successActions: [appointmentsSuccess]
		});
	}
}

export function sendAppointment(appointment, successMessage) {
	return (dispatch, getState) => {
		let successActionPayload = {
			type: 'Success',
			text: successMessage ||  'Appointment saved with success!'
		};
		let params = {
			method:  appointment.Id > 0? 'put' : 'post',
			url: `${urls.api}/appointment`,
			data: JSON.stringify(appointment)
		};
		return genericFetch(dispatch, {
			params,
			businessErrorActions: [openMessageView, appointmentsCreateError],
			fetchErrorActions: [openMessageView, appointmentsCreateError],
			successActions: [openMessageView.bind(null, successActionPayload), appointmentSaveSuccess(appointment)]
		});
	}
}

export function filterDialog(config) {
	let { component, onRequestClose, onOk, onCancel, componentProps } = config;
	return dialogActions.openDialog({
		component,
		componentProps,
		props: {
			title: "Filter",
			open: true,
			onRequestClose: onRequestClose,
			actions: [<FlatButton key={"appointmentFilterCancel"} label='Cancel' onTouchTap={onCancel} />,
				<FlatButton key={"appointmentFilterOk"} label='OK' primary onTouchTap={onOk} />]
		}
	});
}

export function closeFilterDialog(component) {
	return dialogActions.closeDialog({}, component);
}