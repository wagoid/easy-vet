import axios from 'axios';
import { push } from 'react-router-redux';
import moment from 'moment';

const UNAUTHORIZED_STATUS = 401;

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

function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

Date.prototype.defaultToISOString = Date.prototype.toISOString;
//Replaces toISOString to stop changing timezone on JSON.stringify
Date.prototype.toISOString = function() {
return this.getFullYear() +
	'-' + pad(this.getMonth() + 1) +
	'-' + pad(this.getDate()) +
	'T' + pad(this.getHours()) +
	':' + pad(this.getMinutes()) +
	':' + pad(this.getSeconds()) +
	'.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
	'Z';
};
