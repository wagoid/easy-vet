import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton, Paper, TextField, SelectField, Divider, Subheader, MenuItem } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import * as validations from '../../helpers/validations';
import { dateFormat } from '../../helpers/valueDecode';
import getStyles from './styles';
import { getFieldsValidations } from './validations';
import * as StockActions from '../actions';
import { isString } from '../../helpers/util';
import ProductSelect from '../../product/ProductSelect';

let addressProperties = ['StreetType', 'StreetName', 'Number', 'Complement',
	'Neighbourhood', 'Municipality', 'State', 'ZipCode'].reduce((prev, prop) => ({ ...prev, [prop]: '' }), {});
let defaultStock = {
	Product: null,
	Quantity: 0,
	Address: addressProperties
};

class StockForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: {
				Address: {}
			},
			stock: defaultStock
		};
		this.validations = getFieldsValidations();
		this.removeStock = this.removeStock.bind(this);
		this.saveStock = this.saveStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
		this.actions = bindActionCreators(StockActions, this.props.dispatch);
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
				style={{ display: 'block' }}
				readOnly={this.state.inViewMode}
				onChange={this.handleAddressChange}
				onBlur={this.handleAddressBlur}
				value={this.state.employee.Address[name]}
				errorText={this.state.error.Address[name]}
				floatingLabelText={label}
			/>
		);
	}

	handleChange(event, value, name) {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	handleProductChange(event, index, id, product) {
		let error = { ...this.state.error, Product: '' };
		let stock = { ...this.state.stock, Product: product }
		this.setState({ error, stock });
	}

	updateField(value, fieldName) {
		console.log(value);
		console.log(fieldName);
		let errorText = this.getErrorText(value, fieldName);

		let stock = { ...this.state.stock, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			stock,
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

	saveStock() {
		let error = this.getErrors(error);
		let hasError = Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error,
				triedToSave: true
			});
		} else {
			this.actions.createStock(this.state.stock)
				.then(() => {
					if (this.state.stock.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	removeStock() {
		let error = this.getErrors(error);
		let hasError = Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error,
				triedToSave: true
			});
		} else {
			this.actions.removeStock(this.state.stock)
				.then(() => {
					if (this.state.stock.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	getErrors() {
		let error = {};

		Object.keys(this.state.stock).forEach(prop => {
			let errorText = this.getErrorText(this.state.stock[prop], prop);
			error[prop] = errorText;
		});

		return error;
	}


	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		let hasProductError = !!this.state.error.Product;
		return (
			<div id='StockForm-form'>

				<Paper style={styles.paper}>

					<ProductSelect
						onChange={this.handleProductChange}
						errorText={this.state.error.Product}
						floatingLabelText='Product'
						defaultValue={this.state.stock.Product? this.state.stock.Product.Id : null}
					/>
					{ hasProductError? (<div style={styles.errorText}>This field is required</div>) : null }

					<TextField
						name='Quantity'
						type='number'
						style={{ display: 'block' }}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.state.stock.Quantity}
						errorText={this.state.error.Quantity}
						floatingLabelText='Quantity'
					/>

					<div id='divider-container' style={styles.dividerContainer}>
						<Divider />
					</div>
					
					<Subheader>Address information</Subheader>

					{ this.getAddressGenericTextFields() }

				</Paper>

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingSecondAction}
						onTouchTap={this.removeStock}
					>
						<ContentRemove />
					</FloatingActionButton>)
				}

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.saveStock}
					>
						<ContentAdd />
					</FloatingActionButton>)
				}

			</div>
		);
	}
}

export default connect((state, ownProps) => ({
	stocks: state.stock.stocks,
	products: state.product.products,
	hasOpenMessage: !!state.main.message.open
}))(StockForm);