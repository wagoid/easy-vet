import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, Divider, Subheader, SelectField, DatePicker, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/content/create';
import { userType, dateFormat } from '../../helpers/valueDecode';
import * as validations from '../../helpers/validations';
import getStyles from './styles';
import { getFieldsValidations } from './validations';
import * as ProductActions from '../actions';
import { isString } from '../../helpers/util';
import { productDefinitions } from './fieldDefinitions';

let productProperties = [ 'Name', 'Description', 'Price' ].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});

let defaultProduct = Object.assign({}, productProperties);

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
		this.actions = bindActionCreators(ProductActions, this.props.dispatch);
	}

	getGenericTextFields() {
		return productDefinitions.map((productDefinitions, key) => {
			return this.createGenericTextField({ ...productDefinitions, key });
		});
	}

	createGenericTextField({ name, label, type, key }) {
		return (
			<TextField
				key={key}
				name={name}
				style={ { display: 'block' } }
				type={type || 'text'}
				readOnly={this.state.inViewMode}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				hintText={''}
				value={this.state.product[name]}
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
	
	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let product = { ...this.state.product, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
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
		this.actions.createProduct(this.state.product)
			.then(() => {
				if (this.state.product.Id > 0) {
					this.setState({ inViewMode: true });
				}
			});
	}

	setProductErrors(error) {
		Object.keys(this.state.product).forEach(productProp => {
			let errorText = this.getErrorText(this.state.product[productProp], productProp);
			error[productProp] = errorText;
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		var requiredValidation = {
			required: true
		};

		return (
			<div id='product-edit'>

				<Paper style={styles.paper}>
					{this.getGenericTextFields()}

					<br />

					<SpecialtyGroup
						product={this.state.product}
						inViewMode={this.state.inViewMode}
						onChange={this.handleChange}
						name="SpecialtyGroup"
					/>

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