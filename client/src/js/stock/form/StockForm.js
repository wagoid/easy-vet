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
import * as StockActions from '../actions';
import { isString } from '../../helpers/util';
import ProductSelect from '../../product/ProductSelect';

let defaultStock = {
	Product: null,
	Quantity: 0
};

class StockForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			error: { },
			stock: defaultStock,
			inViewMode: false,
			PaymentMethod: 1,
			selectedProductIndex: null,
			triedToSave: false
		};
		this.validations = getFieldsValidations();
		this.saveStock = this.saveStock.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.handleStockProductAmountChange = this.handleStockProductAmountChange.bind(this);
		this.handleProductSelectChange = this.handleProductSelectChange.bind(this);
		this.handleCostumerChange = this.handleCostumerChange.bind(this);
		this.handlePaymentChange = this.handlePaymentChange.bind(this);
		this.actions = bindActionCreators(StockActions, this.props.dispatch);
	}

	componentWillMount() {
		let locationState = this.props.location.state;
		if (locationState && locationState.stockId && locationState.inViewMode) {
			let stock = this.props.stock || [];
			let stock = stock.find(stock => stock.Id === locationState.stockId);
			if (stock) {
				this.setState({ stock, inViewMode: locationState.inViewMode })
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
		let error = this.getStockErrors(error);
		let hasError = Object.keys(error).some(prop => !!error[prop]);

		if (hasError) {
			this.setState({
				error,
				triedToSave: true
			});
		} else {
			this.state.stock.Payment = {
				Method: this.state.PaymentMethod
			};
			this.actions.createStock(this.state.stock)
				.then(() => {
					if (this.state.stock.Id > 0) {
						this.setState({ inViewMode: true });
					}
				});
		}
	}

	getStockErrors() {
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
					<CostumerSelect onChange={this.handleCostumerChange} errorText={this.state.error.Costumer} floatingLabelText='Costumer' defaultValue={this.state.sale.Costumer? this.state.sale.Costumer.Id : null} />
					{ hasCostumerError? (<div style={styles.errorText}>This field is required</div>) : null }
					<br />
					<PaymentMethodSelect onChange={this.handlePaymentChange} defaultValue={1} floatingLabelText='Payment method' />
					<br />
					<TextField
						name='totalCost'
						type='text'
						style={{ display: 'block' }}
						readOnly
						floatingLabelText='Total cost'
						value={`R$ ${this.state.sale.Value || 0}`}
					/>

					<div id='divider-container' style={styles.dividerContainer}>
						<Divider />
					</div>

					<Subheader style={{ marginBottom: '-15px' }}>Products list</Subheader>

					{ this.state.triedToSave && hasNotRegisteredProduct? (<div style={styles.errorText}>Please provide at least one product</div>) : null }
					{productItems}

					<ProductSelect exclusionProductIds={exclusionProductIds} floatingLabelText='Select a product to add' onChange={this.handleProductSelectChange} />
					<FlatButton style={styles.addShoppingCart} label='Add product' icon={<AddShoppingCart />} onTouchTap={this.addProduct} />
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
					name='product'
					readOnly
					type='text'
					value={productText}
				/>

				<TextField
					name='amount'
					type='number'
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