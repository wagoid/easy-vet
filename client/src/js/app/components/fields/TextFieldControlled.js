import React, { Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import * as validations from '../../../helpers/validations';

class TextFieldControlled extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			errorText: '',
			value: props.value || '',
			validating: false
		};
	}

	handleBlur(event) {
		let errorText = this.getErrorText(event.target.value);
		this.setState({
			validating: true,
			errorText
		});
	}

	handleChange(event) {
		let value = event.target.value;
		let errorText = this.state.validating? this.getErrorText(value) : '';

		this.setState({
			errorText,
			value
		});

		if (this.props.model) {
			this.props.model[this.props.name] = value;
		}
	};

	getErrorText(value) {
		let errorText = '';

		if (this.props.validations) {
			Object.keys(this.props.validations).forEach(validation => {
				let validationParams = this.props.validations[validation];
				if (!validations[validation](value, validationParams)) {
					errorText = validationParams.message || validations.DEFAULT_MESSAGES[validation](validationParams);
				}
			});
		}

		return errorText;
	}

	render() {
		return (
			<div>
				<TextField
					value={this.state.value}
					errorText={this.state.errorText}
					type={this.props.type}
					fullWidth={this.props.fullWidth}
					hintText={this.props.hintText}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					floatingLabelText={this.props.floatingLabelText}
				/>
			</div>
		);
	}
}

TextFieldControlled.propTypes = {
	floatingLabelText: PropTypes.string.isRequired,
	validations: PropTypes.object,
	name: PropTypes.string,
	type: PropTypes.string,
	fullWidth: PropTypes.bool
}

export default TextFieldControlled;