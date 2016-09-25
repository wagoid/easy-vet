import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, SelectField, Divider, Subheader, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import FlatButton from 'material-ui/FlatButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import * as validations from '../../helpers/validations';
import { dateFormat } from '../../helpers/valueDecode';
import getStyles from './styles';
import { getFieldsValidations } from './validations';
import * as AppointmentActions from '../actions';
import { isString } from '../../helpers/util';
import CostumerSelect from '../../costumer/CostumerSelect';
import AnimalSelect from '../../animal/AnimalSelect';

const FETCH_ANIMAL_URL = '/appointment/animal/fromcostumer/';

let defaultAppointment = {
	Costumer: null,
	Animal: null,
	Veterinary: null,
	Name: '',
	Description: ''
};

class AppointmentForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: { },
			appointment: defaultAppointment
		};
		this.validations = getFieldsValidations();
		this.saveAppointment = this.saveAppointment.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleCostumerChange = this.handleCostumerChange.bind(this);
		this.handleAnimalChange = this.handleAnimalChange.bind(this);
		this.actions = bindActionCreators(AppointmentActions, this.props.dispatch);
	}

	componentDidMount() {
		let locationState = this.props.location.state || {};
		if (!locationState.veterinaryId || !this.props.employees) {
			this.context.router.push('/appointment');
		} else {
			this.setState({
				Date: locationState.date,
				Veterinary: this.props.employees.find(emp => emp.Id === locationState.veterinaryId)
			});
		}
	}

	handleChange(event, value, name) {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	handleCostumerChange(event, index, id, costumer) {
		let error = { ...this.state.error, Costumer: '' };
		let appointment = { ...this.state.appointment, Costumer: costumer }
		this.setState({ error, appointment });
	}

	handleAnimalChange(event, index, id, animal) {
		let error = { ...this.state.error, Animal: '' };
		let appointment = { ...this.state.appointment, Animal: animal }
		this.setState({ error, appointment });
	}

	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let appointment = { ...this.state.appointment, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			appointment,
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

	saveAppointment() {
		let error = this.getErrors(error);
		let hasError = Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error,
				triedToSave: true
			});
		} else {
			this.actions.createAppointment(this.state.appointment)
				.then(() => {
					if (this.state.appointment.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	getErrors() {
		let error = {};

		Object.keys(this.state.appointment).forEach(prop => {
			let errorText = this.getErrorText(this.state.appointment[prop], prop);
			error[prop] = errorText;
		});

		return error;
	}


	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		let hasCostumerError = !!this.state.error.Costumer;
		let hasAnimalError = !!this.state.error.Animal;
		let costumerId = this.state.appointment.Costumer? this.state.appointment.Costumer.Id : null;
		return (
			<div id='appointment-form'>

				<Paper style={styles.paper}>
					<TextField
						name='Name'
						type='text'
						style={ { display: 'block' } }
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.state.appointment.Name}
						errorText={this.state.error.Name}
						floatingLabelText='Name'
					/>

					<TextField
						name='Description'
						type='text'
						style={ { display: 'block' } }
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.state.appointment.Description}
						errorText={this.state.error.Description}
						floatingLabelText='Description'
					/>

					<TextField
						name="Date"
						type='Text'
						readOnly={true}
						style={ { display: 'block' } }
						floatingLabelText="Date"
						value={dateFormat(this.state.Date, 'LLL')}
					/>

					<CostumerSelect
						onChange={this.handleCostumerChange}
						errorText={this.state.error.Costumer}
						floatingLabelText="Costumer"
						defaultValue={costumerId}
					/>
					{ hasCostumerError? (<div style={styles.errorText}>This field is required</div>) : null }

					<br />

					<AnimalSelect
						onChange={this.handleAnimalChange}
						errorText={this.state.error.Animal}
						floatingLabelText="Animal"
						fetchUrl={FETCH_ANIMAL_URL}
						costumerId={costumerId}
						defaultValue={this.state.appointment.Animal? this.state.appointment.Animal.Id : null}
					/>
					{ hasAnimalError? (<div style={styles.errorText}>This field is required</div>) : null }

				</Paper>

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.saveAppointment}
					>
						<ContentSave />
					</FloatingActionButton>)
				}

			</div>
		);
	}
}

AppointmentForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect((state, ownProps) => ({
	hasOpenMessage: !!state.main.message.open,
	employees: state.employee.employees
}))(AppointmentForm);