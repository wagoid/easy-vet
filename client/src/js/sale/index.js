import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat, paymentMethod, paymentStatus } from '../helpers/valueDecode';
import { floatingActionStyles, additionalFloatingActionStyles } from '../styles/actions';
import { setAdditionalFloatingActions } from '../app/appbar/actions';
import Pets from 'material-ui/svg-icons/action/pets';

import SaleCard from './SaleCard';
import * as SaleActions from './actions';

class SaleList extends Component {

	constructor(...args) {
		super(...args);
		this.addSale = this.addSale.bind(this);
		this.viewSale = this.viewSale.bind(this);
		this.actions = bindActionCreators({ ...SaleActions, setAdditionalFloatingActions }, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.sales.length) {
			this.actions.fetchSales();
		}

		let floatingAction = (
			<FloatingActionButton
				key='salesGenerateReportAction'
				style={additionalFloatingActionStyles()}
				secondary
				onClick={() => this.actions.openGenerateReportDialog()}>
					<Pets />
			</FloatingActionButton>
		);
		this.actions.setAdditionalFloatingActions(floatingAction);
	}

	componentWillUnmount() {
		this.actions.setAdditionalFloatingActions([]);
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addSale() {
		this.context.router.push('/sale/form')
	}

	viewSale(sale) {
		let newLocation =  { ...this.props.location, pathname: '/sale/form' , state: { saleId: sale.Id, inViewMode: true } };
		this.context.router.push(newLocation);
	}

	render() {
		const styles = this.getStyles();
		let keyReplacements = {
			
		};
		//TODO: add value masks for enums
		let valueMasks = {
			Method: { func: paymentMethod },
			Status: { func: paymentStatus }
		}

		const saleCards = this.props.sales.map((sale) => {
			return (<SaleCard
				onClick={this.viewSale}
				key={sale.Id}
				sale={sale}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='sale-view'>
				{saleCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addSale}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

SaleList.defaultProps = {
	sales: []
}

SaleList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	sales: PropTypes.array,
	open: PropTypes.bool,
}

SaleList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	sales: state.sale.sales,
	hasOpenMessage: !!state.main.message.open
}))(SaleList);