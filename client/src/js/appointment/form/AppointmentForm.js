import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, SelectField, Divider, Subheader, DatePicker, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import FlatButton from 'material-ui/FlatButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import * as validations from '../../helpers/validations';
import getStyles from './styles';
import { getFieldsValidations } from './validations';
import * as AppointmentActions from '../actions';
import { isString, additionalFloatingActionStyles } from '../../helpers/util';
import CostumerSelect from '../../costumer/CostumerSelect';

let defaultAppointment = {
	Costumer: null
};

class AppointmentForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: { },
			SaleProducts: [],
			inViewMode: false,
			PaymentMethod: 1,
			selectedProductIndex: null,
			triedToSave: false
		};
		this.validations = getFieldsValidations();
		this.saveAppointment = this.saveAppointment.bind(this);
		this.handleCostumerChange = this.handleCostumerChange.bind(this);
		this.actions = bindActionCreators(AppointmentActions, this.props.dispatch);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.appointmentId && locationState.inViewMode) {
			let appointments = this.props.appointments || [];
			let appointment = appointments.find(appointment => appointment.Id === locationState.appointmentId);
			if (appointment) {
				this.setState({ appointment, appointmentProducts: appointment.appointmentProducts, inViewMode: locationState.inViewMode })
			}
		}
	}

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
			error
		});
	}

	handleCostumerChange(event, index, value) {
		let error = { ...this.state.error, Costumer: '' };
		let appointment = { ...this.state.appointment, Costumer: this.props.costumers[index] }
		this.setState({ error, appointment });
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
		let error = this.getAppointmentErrors(error);
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

	getAppointmentErrors() {
		let error = {};

		Object.keys(this.state.appointment).forEach(appointmentProp => {
			let errorText = this.getErrorText(this.state.appointment[appointmentProp], appointmentProp);
			error[appointmentProp] = errorText;
		});

		return error;
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		let hasCostumerError = !!this.state.error.Costumer;
		return (
			<div id='appointment-form'>

				<Paper style={styles.paper}>
					<CostumerSelect onChange={this.handleCostumerChange} errorText={this.state.error.Costumer} floatingLabelText="Costumer" defaultValue={this.state.appointment.Costumer? this.state.appointment.Costumer.Id : null} />
					{ hasCostumerError? (<div style={styles.errorText}>This field is required</div>) : null }
					<br />

				</Paper>

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.state.inViewMode? this.editAppointment : this.saveSale}
					>
						<ContentSave />
					</FloatingActionButton>)
				}

			</div>
		);
	}
}

export default connect((state, ownProps) => ({
	appointments: state.appointment.appointments,
	hasOpenMessage: !!state.main.message.open,
	costumers: state.costumer.costumers
}))(AppointmentForm);