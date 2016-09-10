	import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, Divider, Subheader, SelectField, DatePicker, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/content/create';
import { userType, dateFormat } from '../../helpers/valueDecode';
import * as validations from '../../helpers/validations';
import getStyles from './styles';
import { getFieldsValidations, getAddressFieldsValidations } from './validations';
import * as ProductActions from '../actions';
import { isString } from '../../helpers/util';
import { productDefinitions } from './fieldDefinitions';

let productProperties = [ 'Name', 'Cpf', 'PhoneNumber', 'Password', 'BirthDate', 'Type', 'Salary' ].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});

let defaultProduct = Object.assign({}, productProperties);
defaultProduct.Type = 1;

class ProductForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			product: defaultProduct,
			inViewMode: false
		};
		this.validations = getFieldsValidations();
		this.saveProduct = this.saveProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
		this.actions = bindActionCreators(ProductActions, this.props.dispatch);
	}

	getGenericTextFields() {
		return productDefinitions.map((productDefinitions, key) => {
			return this.createGenericTextField({ ...productDefinitions, key });
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
				value={this.state.product[name]}
				errorText={this.state.error[name]}
				floatingLabelText={label}
			/>
		);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.productId && locationState.inViewMode) {
			let products = this.props.products || [];
			let product = products.find(product => product.Id === locationState.productId);
			if (product) {
				this.setState({ product, inViewMode: locationState.inViewMode })
			}
		}
	}

	editProduct() {
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
		let product = { ...this.state.product, BirthDate: value };
		this.setState({ product });
	}
	
	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let product = { ...this.state.product, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			product,
			error
		});
	};

	updateAddressField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName, this.addressValidations);
		let product = { ...this.state.product };
		product.Address[fieldName] = value;
		let error = { ...this.state.error };
		error.Address[fieldName] = errorText;
		
		this.setState({
			product,
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

	saveProduct() {
		let error = {...this.state.error};
		this.setProductErrors(error);
		this.setProductAddressErrors(error);
		let hasError = Object.keys(error.Address).some(prop => !!error.Address[prop]);
		hasError = hasError || Object.keys(error).some(prop => prop !== 'Address' && !!error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createProduct(this.state.product)
				.then(() => {
					if (this.state.product.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	setProductErrors(error) {
		Object.keys(this.state.product).forEach(productProp => {
			if (productProp !== 'Address') {
				let errorText = this.getErrorText(this.state.product[productProp], productProp);
				error[productProp] = errorText;
			}
		});
	}

	setProductAddressErrors(error) {
		Object.keys(this.state.product.Address).forEach(addressProp => {
			let errorText = this.getErrorText(this.state.product.Address[addressProp], addressProp, this.addressValidations);
			error.Address[addressProp] = errorText;
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		var requiredValidation = {
			required: true
		};

		let birthDateField;

		let birthDate = this.state.product.BirthDate;
		if (birthDate && isString(birthDate)) {
			this.state.product.BirthDate = new Date(birthDate);
			birthDateField = (
				<DatePicker
							name="BirthDate"
							disabled={this.state.inViewMode}
							onChange={this.handleBirthDateChange}
							autoOk={false}
							floatingLabelText="Birth Date"
							value={this.state.product.BirthDate}
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
			<div id='product-edit'>

				<Paper style={styles.paper}>
					{this.getGenericTextFields()}

					{birthDateField}
					<br />

					<SpecialtyGroup
						product={this.state.product}
						inViewMode={this.state.inViewMode}
						onChange={this.handleChange}
						name="SpecialtyGroup"
					/>
					
					<div id="divider-container" style={styles.dividerContainer}>
						<Divider />
					</div>
					
					<Subheader>Address information</Subheader>

				</Paper>

				<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.state.inViewMode? this.editProduct : this.saveProduct}
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
				style={ { display: 'block' } }
				readOnly={this.props.inViewMode}
				hintText="Brain surgery"
				floatingLabelText="Specialty"
				value={this.props.product.Specialty || ''}
				onChange={this.handleChange}
			/>
		);

		return (
			<div>
				{this.state.isVeterinary? specialtyField : ''}
			</div>
		);
	}
}

SpecialtyGroup.propTypes = {
	inViewMode: PropTypes.bool.isRequired,
	product: PropTypes.object.isRequired
}

export default connect((state, ownProps) => ({
	products: state.product.products,
	hasOpenMessage: !!state.main.message.open
}))(ProductForm);