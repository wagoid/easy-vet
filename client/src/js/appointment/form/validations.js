const requiredValidation = {
	required: {}
};

export function getFieldsValidations() {
	return {
		Name: requiredValidation,
		Description: requiredValidation,
		Costumer: requiredValidation,
		Animal: requiredValidation
	};
}