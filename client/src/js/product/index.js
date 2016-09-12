import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../helpers/util';

import Product from './Product';
import * as ProductActions from './actions';

class ProductList extends Component {

	constructor(...args) {
		super(...args);
		this.addProduct = this.addProduct.bind(this);
		this.viewProduct = this.viewProduct.bind(this);
		this.actions = bindActionCreators(ProductActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.products.length) {
			this.actions.fetchProducts();
		}
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addProduct() {
		this.context.router.push('/product/form')
	}

	viewProduct(product) {
		let newLocation =  { ...this.props.location, pathname: '/product/form' , state: { productId: product.Id, inViewMode: true } };
		this.context.router.push(newLocation);
	}

	render() {
		const styles = this.getStyles();
		let keyReplacements = {
			BirthDate: 'Birth Date'
		};
		let valueMasks = {
			BirthDate: {
				func: dateFormat,
				mask: 'date'
			},
			Type: {
				func: userType
			}
		}

		const productCards = this.props.products.map((product) => {
			return (<Product
				onClick={this.viewProduct}
				key={product.Id}
				product={product}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='product-view'>
				{productCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addProduct}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

ProductList.defaultProps = {
	products: []
}

ProductList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	products: PropTypes.array,
	open: PropTypes.bool,
}

ProductList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	products: state.product.products,
	hasOpenMessage: !!state.main.message.open
}))(ProductList);