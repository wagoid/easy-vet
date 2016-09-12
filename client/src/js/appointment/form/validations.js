export function getFieldsValidations() {
	let requiredValidation = {
		required: {}
	};
	return {
		SaleProducts: requiredValidation,
		Costumer: requiredValidation,
		PaymentMethod: requiredValidation
	};
}