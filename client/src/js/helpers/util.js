import axios from 'axios';
import { push } from 'react-router-redux';
import moment from 'moment';

export const SNACKBAR_HEIGHT = 48;
export const FLOATING_BUTTON_BOTTOM = 20;

const UNAUTHORIZED_STATUS = 401;

export function floatingActionStyles(hasOpenMessage) {
	return {
		position: 'fixed',
		right: 20,
		bottom: hasOpenMessage && window.screen.width < 768? SNACKBAR_HEIGHT + 10 : FLOATING_BUTTON_BOTTOM,
		zIndex: 100
	};
}

export function additionalFloatingActionStyles() {
	return {
		position: 'relative',
		top: '30px',
		right: '0',
		width: '56px',
		height: '56px',
		boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 2px 3px, rgba(0, 0, 0, 0.227451) 0px 2px 3px'
	};
}

export function genericFetch(dispatch, config = {}) {
	return axios(config.params)
		.then(response => {
			if (response.data.Message) {
				var firstMessageSentence = response.data.Message.split('.').shift();
				let errorPayload = { type: response.data.Type, text: firstMessageSentence };
				dispatchActions(dispatch, errorPayload, ...config.businessErrorActions);
			} else {
				dispatchActions(dispatch, response.data.Data, ...config.successActions);
			}

			return response.data.Data;
		})
		.catch(catchFetch(dispatch, ...config.fetchErrorActions));
}

export function catchFetch(dispatch, ...actionsToDispatch) {
	return error => {
		console.log(error, error.stack);
		let payload = {
			type:  ~error.message.indexOf('Network Error')? 'FetchError' : error.name,
			text: ~error.message.indexOf('Network Error')? 'Failed to retrieve data from server' : error.message
		};
		actionsToDispatch.forEach(actionMethod => dispatch(actionMethod(payload)));
		if (error.response && error.response.status === UNAUTHORIZED_STATUS) {
			dispatch(push('/login'));
		}
	};
}

export function weekDaysFromStart(start) {
	let weekDays = [moment(start)];
	for (var i = 1; i < 7; i++) {
		weekDays.push(moment(start).add(i, 'day'));
	}
	return weekDays;
}

export function dayHoursFromMidNight() {
	return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
		.map(hour => moment().startOf('day').add(hour, 'hour'));
}

export function dispatchActions(dispatch, payload, ...actions) {
	actions.forEach(action => dispatch(action(payload)));
}


export function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function isNumber(value) {
	return typeof value === 'number';
}

export function isString(value) {
	return typeof value === 'string';
}

export function parseToArray(itemToParse) {
	let parsedItme;
	if (Array.isArray()) {
		parsedItme = itemToParse
	} else {
		parsedItme = [itemToParse];
	}

	return parsedItme;
}