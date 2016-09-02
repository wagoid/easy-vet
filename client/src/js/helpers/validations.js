import { isObject, isNumber} from './util';

export const DEFAULT_MESSAGES = {
	required: () => 'This field is required',
	minLength: (params) => `This field must have a minimum length of ${params.minLength}`,
	maxLength: (params) => `This field must have a maximum length of ${params.maxLength}`
};

export function required(value) {
	var isNonEmptyArray = Array.isArray(value) && !!value.length;
	return isObject(value)? !!Object.keys(value).length : (!!value || isNonEmptyArray || isNumber(value));
}

export function minLength(value, params) {
	let valueString = value? value.toString() : '';
	return !!value && valueString.length >= params.minLength;
}

export function maxLength(value, params) {
	let valueString = value? value.toString() : '';
	return !!value && valueString.length >= params.maxLength;
}

export function betWeenLength(value, params) {
	let valueString = value? value.toString() : '';
	return !!value && valueString.length >= params.minLength && valueString.length <= params.maxLength;
}

export function email(value) {
	let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
	return emailRegex.test(value);
}