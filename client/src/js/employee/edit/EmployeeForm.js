import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, SelectField, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { userType, dateFormat } from '../../helpers/valueDecode';
import { floatingActionStyles } from '../../helpers/util';
import TextFieldControlled from '../../app/components/fields/TextFieldControlled';
import EmployeeTypes from '../EmployeeTypes';
import AddressSelect from '../../address/AddressSelect';


class EmployeeForm extends Component {
	
	constructor(props) {
		super(props);
		this.employee = {};
		this.saveEmployee = this.saveEmployee.bind(this);
		this.setAddress = this.setAddress.bind(this);
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

	saveEmployee() {

	}

	setAddress(event, index, value) {
		var address = this.props.addresses.find(addr => addr.Id === value);
		this.employee.Address = address;
	}

	render() {
		let styles = this.getStyles();
		var requiredValidation = {
			required: true
		};

		return (
			<div id='employee-edit'>

				<Paper style={styles.paper}>
					<TextFieldControlled
						name="Name"
						model={this.employee}
						ref="Name"
						type="text"
						hintText="Wagão"
						fullWidth={true}
						floatingLabelText="User name"
						validations={requiredValidation}
					/>
					<br />
					<TextFieldControlled
						name="Cpf"
						model={this.employee}
						ref="Cpf"
						type="text"
						fullWidth={true}
						hintText="999.999.999-99"
						floatingLabelText="Cpf"
						validations={requiredValidation}
					/>
					<br />
					<TextFieldControlled
						name="Password"
						model={this.employee}
						type="password"
						fullWidth={true}
						floatingLabelText="Password"
						validations={requiredValidation}
					/>
					<br />
					<AddressSelect fullWidth={true} floatingLabelText="Endereço" onChange={this.setAddress} />
					<br />
					<TextFieldControlled
						name="BirthDate"
						model={this.employee}
						type="date"
						floatingLabelText="Birth date"
						validations={requiredValidation}
					/>
					<br />
					<SpecialtyGroup model={this.employee} name="SpecialtyGroup" ref="SpecialtyGroup" />

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
			<TextFieldControlled
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