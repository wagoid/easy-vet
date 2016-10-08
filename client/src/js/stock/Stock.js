import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Stock extends Component {

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
			this.props.onClick(this.props.stock);
		}
	}

	render() {
		let { stock, keyReplacements, valueMasks } = this.props;
		let address = stock.Address;
		let styles = this.getStyles();
		let userTypeMask = valueMasks.Type;
		
		let keysToShow = Object.keys(stock).filter(prop => !~['Id', 'Name', 'RowVersion'].indexOf(prop));

		var cardTexts = keysToShow.map((key, index) => {
			let keyText = keyReplacements[key] || key;
			let valueMask = valueMasks[key];
			return (
				<CardText key={index} style={styles.cardText}>
					{keyText}: {valueMask? valueMask.func(stock[key], valueMask.mask) : stock[key]}
				</CardText>
			)
			
		});

		return (
			<Card onClick={this.handleClick} style={styles.card}>
				<CardHeader
					title={stock.product.Name}
					subtitle={userTypeMask? userTypeMask.func(stock.product.Type) : stock.product.Type}
				/>

				{cardTexts}
			</Card>
		);
	}
}

Stock.propTypes = {
	stock: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired,
	onClick: PropTypes.func
}

export default Stock;