import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, SelectField, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { userType, dateFormat } from '../../helpers/valueDecode';
import { floatingActionStyles } from '../../helpers/util';
import * as validations from '../../helpers/validations';
import EmployeeTypes from '../EmployeeTypes';
import AddressSelect from '../../address/AddressSelect';

let defaultEmployee = {
	Name: null,
	Cpf: null,
	Password: null,
	BirthDate: null,
	Address: null,
	Type: null
}

class EmployeeForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			employee: defaultEmployee
		};
		this.validations = this.getFieldsValidations();
		this.saveEmployee = this.saveEmployee.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setAddress = this.setAddress.bind(this);
	}

	getFieldsValidations() {
		let requiredValidation = {
			required: {}
		};
		return {
			Name: requiredValidation,
			Cpf: requiredValidation,
			Password: requiredValidation,
			BirthDate: requiredValidation
		};
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage),
			paper: {
				padding: window.screen.width > 400? '14px 24px 24px' : '14px 5px 24px 5px',
				margin: '5px auto 0px auto',
				width: '50%',
				minWidth: '300px'
			}
		};
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
			error
		});
	}

	handleChange(event) {
		this.updateField(event.target.value, event.target.name);
	}
	
	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let employee = { ...this.state.employee, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };

		this.setState({
			employee,
			error
		});
	};

	getErrorText(value, fieldName) {
		let errorText = '';

		let validation = this.validations[fieldName];
		if (validation) {
			Object.keys(validation).forEach(validationName => {
				let validationParams = validations[validationName];
				if (!validations[validationName](value, validationParams)) {
					errorText = validations.DEFAULT_MESSAGES[validationName](validationParams);
				}
			});
		}

		return errorText;
	}

	saveEmployee() {
		var error = {...this.state.error};
		Object.keys(this.state.employee).forEach(employeeProp => {
			let errorText = this.getErrorText(this.state.employee[employeeProp], employeeProp);
			error[employeeProp] = errorText;
		});

		if (Object.keys(this.error).length) {
			this.setState({
				error
			});
		} else {
			//Save the stuff
		}
	}

	setAddress(event, index, value) {
		var address = this.props.addresses.find(addr => addr.Id === value);
		this.state.employee.Address = address;
	}

	render() {
		let styles = this.getStyles();
		var requiredValidation = {
			required: true
		};

		return (
			<div id='employee-edit'>

				<Paper style={styles.paper}>
					<TextField
						name="Name"
						type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						hintText="Wagão"
						errorText={this.state.error.Name}
						fullWidth={true}
						floatingLabelText="User name"
					/>
					<br />
					<TextField
						name="Cpf"
						type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						fullWidth={true}
						errorText={this.state.error.Cpf}
						hintText="999.999.999-99"
						floatingLabelText="Cpf"
					/>
					<br />
					<TextField
						name="Password"
						type="password"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						errorText={this.state.error.Password}
						fullWidth={true}
						floatingLabelText="Password"
					/>
					<br />
					<AddressSelect fullWidth={true} floatingLabelText="Endereço" onChange={this.setAddress} />
					<br />
					<TextField
						name="BirthDate"
						type="date"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						errorText={this.state.error.BirthDate}
						floatingLabelText="Birth date"
					/>
					<br />
					<SpecialtyGroup model={this.state.employee} name="SpecialtyGroup" ref="SpecialtyGroup" />

					<FloatingActionButton
						style={styles.addContent}
						onTouchTap={this.saveEmployee}
					>
						<ContentSave />
					</FloatingActionButton>
				</Paper>

			</div>
		);
	}
}

class SpecialtyGroup extends Component {
	
	constructor(props) {
		super(props);
		this.state = { isVeterinary: this.props.isVeterinary || false };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index, value) {
		if (value === 3) {
			this.setState({ isVeterinary: true });
		} else {
			this.setState({ isVeterinary: false });
		}
		this.props.model[this.props.name] = value;
	}

	render() {
		let specialtyField = (
			<TextField
				name="Specialty"
				fullWidth={true}
				model={this.props.model}
				ref="Specialty"
				type="text"
				hintText="Brain surgery"
				floatingLabelText="Specialty"
			/>
		);

		return (
			<div>
				<EmployeeTypes ref="Type" fullWidth={true} onChange={this.handleChange} name="Type" />
				{this.state.isVeterinary? specialtyField : ''}
			</div>
		);
	}
}

SpecialtyGroup.propTypes = {
	model: PropTypes.object.isRequired
}

export default connect((state, ownProps) => ({
	employees: state.employee.employees,
	hasOpenMessage: !!state.main.message.open,
	addresses: state.address.addresses,
	employeeId: ownProps.location.query.id
}))(EmployeeForm);