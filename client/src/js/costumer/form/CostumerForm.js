import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, Divider, Subheader, SelectField, DatePicker, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/content/create';
import Pets from 'material-ui/svg-icons/action/pets';
import { userType, dateFormat } from '../../helpers/valueDecode';
import * as validations from '../../helpers/validations';
import getStyles from './styles';
import { getFieldsValidations, getAddressFieldsValidations } from './validations';
import * as CostumerActions from '../actions';
import { setAdditionalFloatingActions } from '../../app/appbar/actions';
import { isString, additionalFloatingActionStyles } from '../../helpers/util';
import { addressDefinitions, costumerDefinitions } from './fieldDefinitions';

let costumerProperties = [ 'Name', 'Cpf', 'PhoneNumber', 'Password', 'BirthDate', 'Address', 'Type', 'Email' ].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});
let addressProperties = ['StreetType', 'StreetName', 'Number', 'Complement',
	'Neighbourhood', 'Municipality', 'State', 'ZipCode'].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});

let defaultCostumer = Object.assign({}, costumerProperties, { Address: addressProperties });
defaultCostumer.Type = 0;
defaultCostumer.Password = 'costumer1234';

class CostumerForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: {
				Address: {}
			},
			costumer: defaultCostumer,
			inViewMode: false
		};
		this.validations = getFieldsValidations();
		this.addressValidations = getAddressFieldsValidations();
		this.saveCostumer = this.saveCostumer.bind(this);
		this.editCostumer = this.editCostumer.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleAddressBlur = this.handleAddressBlur.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
		this.actions = bindActionCreators({ ...CostumerActions, setAdditionalFloatingActions }, this.props.dispatch);
	}

	getAddressGenericTextFields() {
		return addressDefinitions.map((addressDefinition, key) => {
			return this.createGenericAddressTextField({...addressDefinition, key });
		});
	}

	createGenericAddressTextField({ name, label, type, key }) {
		return (
			<TextField
				key={key}
				name={name}
				type={type || 'text'}
				style={ { display: 'block' } }
				readOnly={this.state.inViewMode}
				onChange={this.handleAddressChange}
				onBlur={this.handleAddressBlur}
				value={this.state.costumer.Address[name]}
				errorText={this.state.error.Address[name]}
				floatingLabelText={label}
			/>
		);
	}

	getGenericTextFields() {
		return costumerDefinitions.map((costumerDefinition, key) => {
			return this.createGenericTextField({ ...costumerDefinition, key });
		});
	}

	createGenericTextField({ name, label, type, hintText, key }) {
		return (
			<TextField
				key={key}
				name={name}
				style={ { display: 'block' } }
				type={type || 'text'}
				readOnly={this.state.inViewMode}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				hintText={hintText || ''}
				value={this.state.costumer[name]}
				errorText={this.state.error[name]}
				floatingLabelText={label}
			/>
		);
	}

	componentDidMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.costumerId && locationState.inViewMode) {
			let costumers = this.props.costumers || [];
			let costumer = costumers.find(costumer => costumer.Id === locationState.costumerId);
			if (costumer) {
				this.setState({ costumer, inViewMode: locationState.inViewMode })
			}
		}

		let floatingAction = (
			<FloatingActionButton disabled={!this.state.costumer.Id} key='costumerFormPetsAction' style={getStyles().additionalFloatingAction} secondary={true}>
					<Pets />
			</FloatingActionButton>
		);
		this.actions.setAdditionalFloatingActions(floatingAction);
	}

	componentWillUnmount() {
		this.actions.setAdditionalFloatingActions([]);
	}

	editCostumer() {
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
		let costumer = { ...this.state.costumer, BirthDate: value };
		this.setState({ costumer });
	}
	
	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let costumer = { ...this.state.costumer, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			costumer,
			error
		});
	};

	updateAddressField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName, this.addressValidations);
		let costumer = { ...this.state.costumer };
		costumer.Address[fieldName] = value;
		let error = { ...this.state.error };
		error.Address[fieldName] = errorText;
		
		this.setState({
			costumer,
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

	saveCostumer() {
		let error = {...this.state.error};
		this.setCostumerErrors(error);
		this.setCostumerAddressErrors(error);
		let hasError = Object.keys(error.Address).some(prop => !!error.Address[prop]);
		hasError = hasError || Object.keys(error).some(prop => prop !== 'Address' && !!error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createCostumer(this.state.costumer)
				.then(() => {
					if (this.state.costumer.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	setCostumerErrors(error) {
		Object.keys(this.state.costumer).forEach(costumerProp => {
			if (costumerProp !== 'Address') {
				let errorText = this.getErrorText(this.state.costumer[costumerProp], costumerProp);
				error[costumerProp] = errorText;
			}
		});
	}

	setCostumerAddressErrors(error) {
		Object.keys(this.state.costumer.Address).forEach(addressProp => {
			let errorText = this.getErrorText(this.state.costumer.Address[addressProp], addressProp, this.addressValidations);
			error.Address[addressProp] = errorText;
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		var requiredValidation = {
			required: true
		};

		let birthDateField;

		let birthDate = this.state.costumer.BirthDate;
		if (birthDate && isString(birthDate)) {
			this.state.costumer.BirthDate = new Date(birthDate);
			birthDateField = (
				<DatePicker
							name="BirthDate"
							disabled={this.state.inViewMode}
							onChange={this.handleBirthDateChange}
							autoOk={false}
							floatingLabelText="Birth Date"
							value={this.state.costumer.BirthDate}
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
			<div id='costumer-edit'>

				<Paper style={styles.paper}>
					{this.getGenericTextFields()}

					{birthDateField}
					<br />
					
					<div id="divider-container" style={styles.dividerContainer}>
						<Divider />
					</div>
					
					<Subheader>Address information</Subheader>

					{ this.getAddressGenericTextFields() }

				</Paper>

				<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.state.inViewMode? this.editCostumer : this.saveCostumer}
					>
						{ this.state.inViewMode? <ContentEdit /> : <ContentSave /> }
				</FloatingActionButton>

			</div>
		);
	}
}

export default connect((state, ownProps) => ({
	costumers: state.costumer.costumers,
	hasOpenMessage: !!state.main.message.open
}))(CostumerForm);