import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class StockCard extends Component {

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
		let styles = this.getStyles();

		return (
			<Card onClick={this.handleClick} style={styles.card}>
				<CardHeader
					title={stock.Product.Name}
					subtitle={stock.Quantity}
				/>
			</Card>
		);
	}
}

StockCard.propTypes = {
	stock: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired,
	onClick: PropTypes.func
}

export default StockCard;