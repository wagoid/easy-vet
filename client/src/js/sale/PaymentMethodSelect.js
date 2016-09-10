import React, {Component, PropTypes} from 'react';
import { PAYMENT_METHOD } from '../helpers/valueDecode';
import { SelectField, MenuItem } from 'material-ui';

class PaymentMethodSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue || 1};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		var paymentMethodOptions = PAYMENT_METHOD.map((method, index) => {
			return (
				<MenuItem key={index} value={index} name={method.replace(' ', '')} primaryText={method} />
			);
		});

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				disabled={this.props.disabled}
				fullWidth={this.props.fullWidth}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{paymentMethodOptions}
			</SelectField>
		);
	}
}

PaymentMethodSelect.PropTypes = {
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	floatingLabelText: PropTypes.string.required
}

export default PaymentMethodSelect;