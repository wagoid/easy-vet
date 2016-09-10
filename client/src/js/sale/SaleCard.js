import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class SaleCard extends Component {

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
			this.props.onClick(this.props.sale);
		}
	}

	render() {
		let { sale, keyReplacements, valueMasks } = this.props;
		let styles = this.getStyles();
		let paymentMethodMask = valueMasks.Method;
		let paymentStatusMask = valueMasks.Status;
		let paymentAdditionalInfoText;
		if (sale.Payment) {
			paymentAdditionalInfoText = paymentMethodMask? paymentMethodMask.func(sale.Payment.Method) : sale.Payment.Method;
			paymentAdditionalInfoText += ' - ' + (paymentStatusMask? paymentStatusMask.func(sale.Payment.Status) : sale.Payment.Status);
		} else {
			paymentAdditionalInfoText = '';
		}

		return (
			<Card onClick={this.handleClick} style={styles.card}>
				<CardHeader
					title={sale.Value}
					subtitle={ paymentAdditionalInfoText }
				/>
			</Card>
		);
	}
}

SaleCard.propTypes = {
	sale: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired,
	onClick: PropTypes.func
}

export default SaleCard;