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

let defaultSale = {
	Costumer: null,
	Payment: {

	},
	Value: 0,
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
		this.actions = bindActionCreators(AppointmentActions, this.props.dispatch);
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
		let error = this.getSaleErrors(error);
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

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		let exclusionProductIds = {};
			return (
				<div key={index}>
				</div>
			)
		});

		return (
			<div id='appointment-form'>

				<Paper style={styles.paper}>
				</Paper>

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.state.inViewMode? this.editSale : this.saveSale}
					>
						<ContentSave />
					</FloatingActionButton>)
				}

			</div>
		);
	}
}

export default connect((state, ownProps) => ({
	hasOpenMessage: !!state.main.message.open,
}))(AppointmentForm);