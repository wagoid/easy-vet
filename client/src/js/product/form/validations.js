export function getFieldsValidations() {
	let requiredValidation = {
		required: {}
	};
	return {
		Name: requiredValidation,
		Description: requiredValidation,
		Price: requiredValidation
	};
}