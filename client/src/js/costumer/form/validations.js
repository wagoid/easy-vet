let requiredValidation = {
	required: {}
};

export function getFieldsValidations() {
	return {
		Name: requiredValidation,
		Cpf: requiredValidation,
		Password: requiredValidation,
		PhoneNumber: requiredValidation,
		BirthDate: requiredValidation,
		Email: requiredValidation
	};
}

export function getAddressFieldsValidations() {
	return {
		StreetType: requiredValidation,
		StreetName: requiredValidation,
		Number: requiredValidation,
		Municipality: requiredValidation,
		State: requiredValidation,
		ZipCode: requiredValidation
	};
}

export function getAnimalFieldsValidations() {
	return {
		Name: requiredValidation,
		Breed: requiredValidation
	};
}