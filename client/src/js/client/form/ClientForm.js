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
import * as ClientActions from '../actions';
import { setAdditionalFloatingActions } from '../../app/appbar/actions';
import { isString, additionalFloatingActionStyles } from '../../helpers/util';
import { addressDefinitions, clientDefinitions } from './fieldDefinitions';

let clientProperties = [ 'Name', 'Cpf', 'PhoneNumber', 'Password', 'BirthDate', 'Address', 'Type', 'Client' ].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});
let addressProperties = ['StreetType', 'StreetName', 'Number', 'Complement',
	'Neighbourhood', 'Municipality', 'State', 'ZipCode'].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});

let defaultClient = Object.assign({}, clientProperties, { Address: addressProperties });
defaultClient.Type = 0;

class ClientForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: {
				Address: {}
			},
			client: defaultClient,
			inViewMode: false
		};
		this.validations = getFieldsValidations();
		this.addressValidations = getAddressFieldsValidations();
		this.saveClient = this.saveClient.bind(this);
		this.editClient = this.editClient.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleAddressBlur = this.handleAddressBlur.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
		this.actions = bindActionCreators({ ...ClientActions, setAdditionalFloatingActions }, this.props.dispatch);
	}

	componentWillMount() {
		let floatingAction = (
			<FloatingActionButton style={this.getStyles().additionalFloatingAction} secondary={true}>
					<Pets />
			</FloatingActionButton>
		);
		this.actions.setAdditionalFloatingActions([floatingAction]);
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
				value={this.state.client.Address[name]}
				errorText={this.state.error.Address[name]}
				floatingLabelText={label}
			/>
		);
	}

	getGenericTextFields() {
		return clientDefinitions.map((clientDefinition, key) => {
			return this.createGenericTextField({ ...clientDefinition, key });
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
				value={this.state.client[name]}
				errorText={this.state.error[name]}
				floatingLabelText={label}
			/>
		);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.clientId && locationState.inViewMode) {
			let clients = this.props.clients || [];
			let client = clients.find(client => client.Id === locationState.clientId);
			if (client) {
				this.setState({ client, inViewMode: locationState.inViewMode })
			}
		}
	}

	editClient() {
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
		let client = { ...this.state.client, BirthDate: value };
		this.setState({ client });
	}
	
	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let client = { ...this.state.client, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			client,
			error
		});
	};

	updateAddressField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName, this.addressValidations);
		let client = { ...this.state.client };
		client.Address[fieldName] = value;
		let error = { ...this.state.error };
		error.Address[fieldName] = errorText;
		
		this.setState({
			client,
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

	saveClient() {
		let error = {...this.state.error};
		this.setClientErrors(error);
		this.setClientAddressErrors(error);
		let hasError = Object.keys(error.Address).some(prop => !!error.Address[prop]);
		hasError = hasError || Object.keys(error).some(prop => prop !== 'Address' && !!error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createClient(this.state.client)
				.then(() => {
					if (this.state.client.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	setClientErrors(error) {
		Object.keys(this.state.client).forEach(clientProp => {
			if (clientProp !== 'Address') {
				let errorText = this.getErrorText(this.state.client[clientProp], clientProp);
				error[clientProp] = errorText;
			}
		});
	}

	setClientAddressErrors(error) {
		Object.keys(this.state.client.Address).forEach(addressProp => {
			let errorText = this.getErrorText(this.state.client.Address[addressProp], addressProp, this.addressValidations);
			error.Address[addressProp] = errorText;
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		var requiredValidation = {
			required: true
		};

		let birthDateField;

		let birthDate = this.state.client.BirthDate;
		if (birthDate && isString(birthDate)) {
			this.state.client.BirthDate = new Date(birthDate);
			birthDateField = (
				<DatePicker
							name="BirthDate"
							disabled={this.state.inViewMode}
							onChange={this.handleBirthDateChange}
							autoOk={false}
							floatingLabelText="Birth Date"
							value={this.state.client.BirthDate}
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
			<div id='client-edit'>

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
						onTouchTap={this.state.inViewMode? this.editClient : this.saveClient}
					>
						{ this.state.inViewMode? <ContentEdit /> : <ContentSave /> }
				</FloatingActionButton>

			</div>
		);
	}
}

export default connect((state, ownProps) => ({
	clients: state.client.clients,
	hasOpenMessage: !!state.main.message.open
}))(ClientForm);