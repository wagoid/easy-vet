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
import * as SaleActions from '../actions';
import { isString, additionalFloatingActionStyles } from '../../helpers/util';
import CostumerSelect from '../../costumer/CostumerSelect';
import PaymentMethodSelect from '../PaymentMethodSelect';


let defaultSale = {
	Costumer: null,
	Payment: {

	},
	PaymentMethod: 1,
	Value: 0,
};

class SaleForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: { },
			sale: defaultSale,
			saleProducts: [],
			inViewMode: false
		};
		this.validations = getFieldsValidations();
		this.saveSale = this.saveSale.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.actions = bindActionCreators(SaleActions, this.props.dispatch);
	}

	componentDidMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.saleId && locationState.inViewMode) {
			let sales = this.props.sales || [];
			let sale = sales.find(sale => sale.Id === locationState.saleId);
			if (sale) {
				this.setState({ sale, inViewMode: locationState.inViewMode })
			}
		}
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
		let sale = { ...this.state.sale, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			sale,
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

	saveSale() {
		let error = {...this.state.error};
		this.setSaleErrors(error);
		this.setSaleAddressErrors(error);
		let hasError = Object.keys(error.Address).some(prop => !!error.Address[prop]);
		hasError = hasError || Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createSale(this.state.sale)
				.then(() => {
					if (this.state.sale.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	setSaleErrors(error) {
		Object.keys(this.state.sale).forEach(saleProp => {
			if (saleProp !== 'Address') {
				let errorText = this.getErrorText(this.state.sale[saleProp], saleProp);
				error[saleProp] = errorText;
			}
		});
	}

	setSaleAddressErrors(error) {
		Object.keys(this.state.sale.Address).forEach(addressProp => {
			let errorText = this.getErrorText(this.state.sale.Address[addressProp], addressProp, this.addressValidations);
			error.Address[addressProp] = errorText;
		});
	}

	addProduct() {
		this.state.saleProducts.push({
			Product: null
		});
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);

		return (
			<div id='sale-form'>

				<Paper style={styles.paper}>
					<CostumerSelect floatingLabelText="Costumer" />
					<br />
					<PaymentMethodSelect defaultValue={1} floatingLabelText="Payment method" />
					<br />
					<TextField
						name="Specialty"
						type="text"
						style={ { display: 'block' } }
						readOnly={true}
						floatingLabelText="Total cost"
						value={this.state.sale.Value || 0}
					/>

					<div id="divider-container" style={styles.dividerContainer}>
						<Divider />
					</div>

					<Subheader>Products list</Subheader>



					<FlatButton style={styles.addShoppingCart} label="Add product" icon={<AddShoppingCart />} onTouchTap={this.addProduct} />
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
	sales: state.sale.sales,
	hasOpenMessage: !!state.main.message.open
}))(SaleForm);