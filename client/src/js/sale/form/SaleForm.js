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
import { isString } from '../../helpers/util';
import CostumerSelect from '../../costumer/CostumerSelect';
import PaymentMethodSelect from '../PaymentMethodSelect';
import ProductSelect from '../../product/ProductSelect';

let defaultSale = {
	Costumer: null,
	Payment: {

	},
	Value: 0,
};

class SaleForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: { },
			sale: defaultSale,
			SaleProducts: [],
			inViewMode: false,
			PaymentMethod: 1,
			selectedProductIndex: null,
			triedToSave: false
		};
		this.validations = getFieldsValidations();
		this.saveSale = this.saveSale.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.handleSaleProductAmountChange = this.handleSaleProductAmountChange.bind(this);
		this.handleProductSelectChange = this.handleProductSelectChange.bind(this);
		this.handleCostumerChange = this.handleCostumerChange.bind(this);
		this.handlePaymentChange = this.handlePaymentChange.bind(this);
		this.actions = bindActionCreators(SaleActions, this.props.dispatch);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.saleId && locationState.inViewMode) {
			let sales = this.props.sales || [];
			let sale = sales.find(sale => sale.Id === locationState.saleId);
			if (sale) {
				this.setState({ sale, SaleProducts: sale.SaleProducts, inViewMode: locationState.inViewMode })
			}
		}
	}


	handleCostumerChange(event, index, value) {
		let error = { ...this.state.error, Costumer: '' };
		let sale = { ...this.state.sale, Costumer: this.props.costumers[index] }
		this.setState({ error, sale });
	}

	handlePaymentChange(event, index, value) {
		this.state.PaymentMethod = value;
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

	saveSale() {
		let error = this.getSaleErrors(error);
		let hasError = Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error,
				triedToSave: true
			});
		} else {
			this.state.sale.Payment = {
				Method: this.state.PaymentMethod
			};
			this.state.sale.SaleProducts = this.state.SaleProducts;
			this.actions.createSale(this.state.sale)
				.then(() => {
					if (this.state.sale.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	getSaleErrors() {
		let error = {};

		Object.keys(this.state.sale).forEach(saleProp => {
			let errorText = this.getErrorText(this.state.sale[saleProp], saleProp);
			error[saleProp] = errorText;
		});

		if (!this.state.SaleProducts.length) {
			error.SaleProducts = "Please provide at least one product";
		}

		return error;
	}

	addProduct() {
		if (this.state.selectedProductIndex !== null) {
			let SaleProducts = [ ...this.state.SaleProducts, { product: this.props.products[this.state.selectedProductIndex], amount: 1 } ];
			let sale = { ...this.state.sale, Value: this.getTotalSaleCost(SaleProducts)}
			this.setState({ SaleProducts, selectedProductIndex: null, sale });
		}
	}

	handleSaleProductAmountChange(product, amount, index) {
		let saleProductToChange = this.state.SaleProducts.find(sp => sp.Product === product);
		saleProductToChange.amount = amount;
		let sale = { ...this.state.sale, Value: this.getTotalSaleCost(this.state.SaleProducts)}
		this.setState({ sale })
	}

	handleProductSelectChange(event, index, value) {
		this.state.selectedProductIndex = index;
	}

	getTotalSaleCost(SaleProducts) {
		return SaleProducts.reduce((accumulated, saleProduct) => accumulated + saleProduct.product.Price * saleProduct.amount, 0);
	}

	render() {
		let styles = getStyles(this.props.hasOpenMessage);
		let exclusionProductIds = {};
		let hasCostumerError = !!this.state.error.Costumer;
		let hasNotRegisteredProduct = !this.state.SaleProducts.length;
		let productItems = this.state.SaleProducts.map((saleProduct, index) => {
			if (saleProduct.Product && saleProduct.Product.Id) {
				exclusionProductIds[saleProduct.Product.Id] = true;
			}
			return (
				<div key={index}>
					<SaleProductGroup
						product={saleProduct.Product}
						amount={saleProduct.amount}
						index={index}
						onAmountChange={this.handleSaleProductAmountChange}
					/>
				</div>
			)
		});

		return (
			<div id='sale-form'>

				<Paper style={styles.paper}>
					<CostumerSelect onChange={this.handleCostumerChange} errorText={this.state.error.Costumer} floatingLabelText="Costumer" defaultValue={this.state.sale.Costumer? this.state.sale.Costumer.Id : null} />
					{ hasCostumerError? (<div style={styles.errorText}>This field is required</div>) : null }
					<br />
					<PaymentMethodSelect onChange={this.handlePaymentChange} defaultValue={1} floatingLabelText="Payment method" />
					<br />
					<TextField
						name="totalCost"
						type="text"
						style={ { display: 'block' } }
						readOnly={true}
						floatingLabelText="Total cost"
						value={`R$ ${this.state.sale.Value || 0}`}
					/>

					<div id="divider-container" style={styles.dividerContainer}>
						<Divider />
					</div>

					<Subheader style={ { marginBottom: '-15px' } }>Products list</Subheader>

					{ this.state.triedToSave && hasNotRegisteredProduct? (<div style={styles.errorText}>Please provide at least one product</div>) : null }
					{productItems}

					<ProductSelect exclusionProductIds={exclusionProductIds} floatingLabelText="Select a product to add" onChange={this.handleProductSelectChange}/>
					<FlatButton style={styles.addShoppingCart} label="Add product" icon={<AddShoppingCart />} onTouchTap={this.addProduct} />
				</Paper>

				{ this.state.inViewMode? null :
					(<FloatingActionButton
						style={styles.floatingAction}
						onTouchTap={this.saveSale}
					>
						<ContentSave />
					</FloatingActionButton>)
				}

			</div>
		);
	}
}

class SaleProductGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: props.product,
			amount: props.amount
		};
		this.handleAmountChange = this.handleAmountChange.bind(this);
	}

	handleAmountChange(event) {
		let value = Number.parseInt(event.target.value);
		value = value < 1? 1: value;
		value = value > 9? 10 : value;
		this.setState({
			amount: value
		});
		if (this.props.onAmountChange) {
			this.props.onAmountChange(this.props.product, value, this.props.index);
		}
	}

	render() {
		let productText;
		if (this.state.Product) {
			productText = `${this.state.product.Name} - R$${this.state.product.Price}`;
		} else {
			productText = '';
		}
		return (
			<div>
				<TextField
					name="product"
					readOnly={true}
					type="text"
					value={productText}
				/>

				<TextField
					name="amount"
					type="number"
					value={this.state.amount}
					onChange={this.handleAmountChange}
				/>
			</div>
		);
	}
}

SaleProductGroup.defaultProps = {
	amount: 0
}

SaleProductGroup.propTypes = {
	Prduct: PropTypes.object.isRequired,
	amount: PropTypes.number,
	index: PropTypes.number.isRequired,
	onAmountChange: PropTypes.func
}

export default connect((state, ownProps) => ({
	sales: state.sale.sales,
	products: state.product.products,
	hasOpenMessage: !!state.main.message.open,
	costumers: state.costumer.costumers
}))(SaleForm);