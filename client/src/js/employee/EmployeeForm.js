import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, SelectField, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../helpers/util';
import TextFieldControlled from '../app/components/fields/TextFieldControlled';
import EmployeeTypes from './EmployeeTypes';


class EmployeeForm extends Component {
	
	constructor(props) {
		super(props);
		this.saveEmployee = this.saveEmployee.bind(this);
		this.state = {
			isVeterinary: props.isVeterinary || false
		};
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage),
			paper: {
				padding: window.screen.width > 400? '14px 24px 24px' : '14px 5px 24px 5px'
			}
		};
	}

	saveEmployee() {

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
						ref="Name"
						type="text"
						hintText="Wagão"
						floatingLabelText="User name"
						validations={requiredValidation}
					/>
					<br />
					<TextFieldControlled
						name="Cpf"
						ref="Cpf"
						type="text"
						hintText="999.999.999-99"
						floatingLabelText="Cpf"
						validations={requiredValidation}
					/>
					<br />
					<TextFieldControlled
						name="Password"
						type="password"
						floatingLabelText="Password"
						validations={requiredValidation}
					/>
					<br />
					<TextFieldControlled
						name="BirthDate"
						type="date"
						hintText="01/01/2001"
						floatingLabelText="Birth date"
						validations={requiredValidation}
					/>
					<br />
					<SpecialtyGroup name="SpecialtyGroup" ref="SpecialtyGroup" />

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
		}
	}

	render() {
		let specialtyField = (
			<TextFieldControlled
				name="Specialty"
				ref="Specialty"
				type="text"
				hintText="Brain surgery"
				floatingLabelText="Specialty"
			/>
		);

		return (
			<div>
				<EmployeeTypes ref="Type" onChange={this.handleChange} name="Type" />
				{this.state.isVeterinary? specialtyField : ''}
			</div>
		);
	}
}

export default connect(state => ({
	employees: state.employee.employees,
	hasOpenMessage: !!state.main.message.open
}))(EmployeeForm);