import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as productActions from './actions';

class ProductSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(productActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.products.length) {
			this.actions.fetchProducts();
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		let productsToShow;
		if (Object.keys(this.props.exclusionProductIds).length > 0) {
			productsToShow = this.props.products.filter(product => !this.props.exclusionProductIds[product.Id]);
		} else {
			productsToShow = this.props.products;
		}
		
		let productOptions = productsToShow.map((product, index) => {
			let productText = `${product.Name} - R$${product.Price}`;
			return (
				<MenuItem key={index} value={product.Id} primaryText={productText} />
			);
		});

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{productOptions}
			</SelectField>
		);
	}
}

ProductSelect.PropTypes = {
	products: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool,
	exclusionProductIds: PropTypes.object
}

ProductSelect.defaultProps = {
	products: [],
	exclusionProductIds: {}
}


export default connect((state, ownProps) => ({
	products: state.product.products
}))(ProductSelect);