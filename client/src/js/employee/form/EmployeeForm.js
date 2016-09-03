import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, Divider, Subheader, SelectField, DatePicker, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/content/create';
import { userType, dateFormat } from '../../helpers/valueDecode';
import * as validations from '../../helpers/validations';
import EmployeeTypes from '../EmployeeTypes';
import getStyles from './styles';
import { getFieldsValidations, getAddressFieldsValidations } from './validations';
import * as EmployeeActions from '../actions';
import { ViewMode } from '../../constants';
import { isString } from '../../helpers/util';

let employeeProperties = [ 'Name', 'Cpf', 'PhoneNumber', 'Password', 'BirthDate', 'Address', 'Type', 'Salary' ].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});
let addressProperties = ['StreetType', 'StreetName', 'Number', 'Complement',
	'Neighbourhood', 'Municipality', 'State', 'ZipCode'].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});

let defaultEmployee = Object.assign({}, employeeProperties, { Address: addressProperties });
defaultEmployee.Type = 1;

class EmployeeForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: {
				Address: {}
			},
			employee: defaultEmployee,
			inViewMode: false
		};
		this.validations = getFieldsValidations();
		this.addressValidations = getAddressFieldsValidations();
		this.saveEmployee = this.saveEmployee.bind(this);
		this.editEmployee = this.editEmployee.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleAddressBlur = this.handleAddressBlur.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
		this.actions = bindActionCreators(EmployeeActions, this.props.dispatch);
	}

	getAddressGenericTextFields() {
		let addressDefinitions = [
			{ name: 'StreetType', label: 'Street type'  },
			{ name: 'StreetName', label: 'Street name'  },
			{ name: 'Number', label: 'Number', type: 'number'  },
			{ name: 'Complement', label: 'Complement'  },
			{ name: 'Neighbourhood', label: 'Neighbourhood'  },
			{ name: 'Municipality', label: 'Municipality'  },
			{ name: 'State', label: 'State'  },
			{ name: 'ZipCode', label: 'Zip code'  }
		];

		return addressDefinitions.map((addressDefinition, key) => {
			return this.createGenericTextField(Object.assign({}, addressDefinition, { key }));
		});
	}

	createGenericTextField({ name, label, type, key }) {
		return (
			<div key={key}>
				<TextField
					name={name}
					type={type || 'text'}
					readOnly={this.state.inViewMode}
					onChange={this.handleAddressChange}
					onBlur={this.handleAddressBlur}
					value={this.state.employee.Address[name]}
					errorText={this.state.error.Address[name]}
					floatingLabelText={label}
				/>
				<br />
			</div>
		);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.employeeId && locationState.inViewMode) {
			let employees = this.props.employees || [];
			let employee = employees.find(employee => employee.Id === locationState.employeeId);
			if (employee) {
				this.setState({ employee, inViewMode: locationState.inViewMode })
			}
		}
	}

	editEmployee() {
		this.setState({ inViewMode: false })
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	handleAddressBlur(event) {
		let errorText = this.getErrorText(event.target.value, event.target.name, this.addressValidations);
		let error = { ...this.state.error };
		error.Address[event.target.name] = errorText;
		this.setState({
			error
		});
	}

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
			error
		});
	}

	handleChange(event, value, name) {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	handleAddressChange(event) {
		this.updateAddressField(event.target.value, event.target.name);
	}

	handleBirthDateChange(event, value) {
		let employee = { ...this.state.employee, BirthDate: value };
		this.setState({ employee });
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

	updateAddressField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName, this.addressValidations);
		let employee = { ...this.state.employee };
		employee.Address[fieldName] = value;
		let error = { ...this.state.error };
		error.Address[fieldName] = errorText;
		
		this.setState({
			employee,
			error
		});
	};

	getErrorText(value, fieldName, validationsDefintion = this.validations) {
		let errorText = '';

		let validation = validationsDefintion[fieldName];
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
		this.setEmployeeErrors(error);
		this.setEmployeeAddressErrors(error);
		let hasError = Object.keys(error.Address).filter(prop => error.Address[prop]).length;
		hasError = hasError || Object.keys(error).filter(prop => prop !== 'Address' && error[prop]).length;

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createEmployee(this.state.employee, this.props.location)
				.then(() => {
					if (this.state.employee.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	setEmployeeErrors(error) {
		Object.keys(this.state.employee).forEach(employeeProp => {
			if (employeeProp !== 'Address') {
				let errorText = this.getErrorText(this.state.employee[employeeProp], employeeProp);
				error[employeeProp] = errorText;
			}
		});
	}

	setEmployeeAddressErrors(error) {
		Object.keys(this.state.employee.Address).forEach(addressProp => {
			let errorText = this.getErrorText(this.state.employee.Address[addressProp], addressProp, this.addressValidations);
			error.Address[addressProp] = errorText;
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		var requiredValidation = {
			required: true
		};

		let birthDateField;

		let birthDate = this.state.employee.BirthDate;
		if (birthDate && isString(birthDate)) {
			this.state.employee.BirthDate = new Date(birthDate);
			birthDateField = (
				<DatePicker
							name="BirthDate"
							disabled={this.state.inViewMode}
							onChange={this.handleBirthDateChange}
							autoOk={false}
							floatingLabelText="Birth Date"
							value={this.state.employee.BirthDate}
							maxDate={new Date()}
						/>
			);
		} else {
			birthDateField = (
				<DatePicker
							name="BirthDate"
							disabled={this.state.inViewMode}
							onChange={this.handleBirthDateChange}
							autoOk={false}
							floatingLabelText="Birth Date"
							maxDate={new Date()}
						/>
			);
		}

		return (
			<div id='employee-edit'>

				<Paper style={styles.paper}>
					<TextField
						name="Name"
						type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						hintText="Wagão"
						readOnly={this.state.inViewMode}
						errorText={this.state.error.Name}
						value={this.state.employee.Name}
						floatingLabelText="User name"
					/>
					<br />
					<TextField
						name="Cpf"
						type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						readOnly={this.state.inViewMode}
						errorText={this.state.error.Cpf}
						value={this.state.employee.Cpf}
						hintText="999.999.999-99"
						floatingLabelText="Cpf"
					/>
					<br />
					<TextField
						name="Password"
						type="password"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						readOnly={this.state.inViewMode}
						errorText={this.state.error.Password}
						value={this.state.employee.Password}
						floatingLabelText="Password"
					/>
					<br />

					<TextField
						name="PhoneNumber"
						type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						readOnly={this.state.inViewMode}
						errorText={this.state.error.PhoneNumber}
						value={this.state.employee.PhoneNumber}
						hintText="(31) 89999-9999"
						floatingLabelText="Phone number"
					/>
					<br />

					{birthDateField}
					<br />

					<TextField
						name="Salary"
						type="number"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						readOnly={this.state.inViewMode}
						errorText={this.state.error.Salary}
						value={this.state.employee.Salary}
						floatingLabelText="Salary"
					/>

					<br />
					<SpecialtyGroup
						employee={this.state.employee}
						inViewMode={this.state.inViewMode}
						onChange={this.handleChange}
						name="SpecialtyGroup"
					/>
					
					<div id="divider-container" style={styles.dividerContainer}>
						<Divider />
					</div>
					
					<Subheader>Address information</Subheader>

					{ this.getAddressGenericTextFields() }

				</Paper>

				<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.state.inViewMode? this.editEmployee : this.saveEmployee}
					>
						{ this.state.inViewMode? <ContentEdit /> : <ContentSave /> }
					</FloatingActionButton>

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
		if (index && value) {
			if (value === 3) {
				this.setState({ isVeterinary: true });
			} else {
				this.setState({ isVeterinary: false });
			}
			if (this.props.onChange) {
				this.props.onChange(event, value, 'Type');
			}
		} else if(this.props.onChange) {
			this.props.onChange(event, event.target.value, event.target.name);
		}
		
	}

	render() {
		let specialtyField = (
			<TextField
				name="Specialty"
				type="text"
				readOnly={this.props.inViewMode}
				hintText="Brain surgery"
				floatingLabelText="Specialty"
				value={this.props.employee.Specialty || ''}
				onChange={this.handleChange}
			/>
		);

		return (
			<div>
				<EmployeeTypes disabled={this.props.inViewMode || this.props.employee.Id > 0} onChange={this.handleChange} name="Type" />
				<br />
				{this.state.isVeterinary? specialtyField : ''}
			</div>
		);
	}
}

SpecialtyGroup.propTypes = {
	inViewMode: PropTypes.bool.isRequired,
	employee: PropTypes.object.isRequired
}

export default connect((state, ownProps) => ({
	employees: state.employee.employees,
	hasOpenMessage: !!state.main.message.open
}))(EmployeeForm);