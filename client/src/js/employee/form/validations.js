export function getFieldsValidations() {
	let requiredValidation = {
		required: {}
	};
	return {
		Name: requiredValidation,
		Cpf: requiredValidation,
		Password: requiredValidation,
		BirthDate: requiredValidation,
		Salary: requiredValidation
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