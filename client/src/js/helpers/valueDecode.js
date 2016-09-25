export function dateFormat(date, type) {
	date = new Date(date);
	if (!type || type === 'date') {
		date = 'L';
	}

	return moment(date).format(type);
}

export function userType(value) {
	return USER_TYPES[value] || USER_TYPES[0];
}

export const USER_TYPES = {
	0: 'Costumer',
	1: 'Cashier',
	2: 'Sales Person',
	3: 'Veterinary'
};

export const EMPLOYEE_TYPES = {
	1: 'Cashier',
	2: 'Sales Person',
	3: 'Veterinary'
};

export const ANIMAL_TYPES = {
	0: 'Dog',
};

export function paymentMethod(value) {
	return PAYMENT_METHOD[value];
}

export function paymentStatus(value) {
	return PAYMENT_STATUS[value];
}

export const PAYMENT_METHOD = ['Card', 'Money', 'Check'];
export const PAYMENT_STATUS = ['Pending', 'Paid'];