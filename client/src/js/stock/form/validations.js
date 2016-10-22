const requiredValidation = {
	required: {}
};

export function getFieldsValidations() {
	return {
		Product: requiredValidation,
		Quantity: requiredValidation
	};
}

export function getAddressFieldsValidations() {
	let requiredValidation = {
		required: {}
	};

	return {
		StreetType: requiredValidation,
		StreetName: requiredValidation,
		Number: requiredValidation,
		Municipality: requiredValidation,
		State: requiredValidation,
		ZipCode: requiredValidation
	};
}

export const addressDefinitions = [
	{ name: 'StreetType', label: 'Street type'  },
	{ name: 'StreetName', label: 'Street name'  },
	{ name: 'Number', label: 'Number', type: 'number'  },
	{ name: 'Complement', label: 'Complement'  },
	{ name: 'Neighbourhood', label: 'Neighbourhood'  },
	{ name: 'Municipality', label: 'Municipality'  },
	{ name: 'State', label: 'State'  },
	{ name: 'ZipCode', label: 'Zip code'  }
];