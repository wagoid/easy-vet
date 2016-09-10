import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Product extends Component {

	constructor(...args) {
		super(...args);
		this.handleClick = this.handleClick.bind(this);
	}

	getStyles() {
		return {
			card: {
				cursor: 'pointer',
				width: '100%',
				minWidth: '300px',
				maxWidth: '1000px',
				margin: '5px auto 0px auto'
			},
			cardText: {
				display: 'inline-block'
			},
			addressCardText: {
				paddingTop: 0
			}
		};
	}

	handleClick() {
		if (this.props.onClick) {
			this.props.onClick(this.props.product);
		}
	}

	render() {
		let { product, keyReplacements, valueMasks } = this.props;
		let address = product.Address;
		let styles = this.getStyles();
		let userTypeMask = valueMasks.Type;
		
		let keysToShow = Object.keys(product).filter(prop => !~['Id', 'Name', 'RowVersion', 'Type', 'Password'].indexOf(prop));

		var cardTexts = keysToShow.map((key, index) => {
			let keyText = keyReplacements[key] || key;
			if (key === 'Address') {
				return (
					<CardText key={index} style={styles.addressCardText}>
						Address: {`${address.StreetType} ${address.StreetName}, nº ${address.Number} - ${address.Neighbourhood}`}
					</CardText>
				);
			} else {
				let valueMask = valueMasks[key];
				return (
					<CardText key={index} style={styles.cardText}>
						{keyText}: {valueMask? valueMask.func(product[key], valueMask.mask) : product[key]}
					</CardText>
				)
			}
			
		});

		return (
			<Card onClick={this.handleClick} style={styles.card}>
				<CardHeader
					title={product.Name}
					subtitle={userTypeMask? userTypeMask.func(product.Type) : product.Type}
				/>

				{cardTexts}
			</Card>
		);
	}
}

Product.propTypes = {
	product: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired,
	onClick: PropTypes.func
}

export default Product;