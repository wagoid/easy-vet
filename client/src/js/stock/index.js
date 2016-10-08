import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../styles/actions';

import Stock from './Stock';
import * as StockActions from './actions';

class StockList extends Component {

	constructor(...args) {
		super(...args);
		this.addStock = this.addStock.bind(this);
		this.viewStock = this.viewStock.bind(this);
		this.actions = bindActionCreators(StockActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.stock.length) {
			this.actions.fetchStock();
		}
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addStock() {
		this.context.router.push('/stock/form')
	}

	viewStock(stock) {
		let newLocation =  { ...this.props.location, pathname: '/stock/form' , state: { stockId: stock.Id, inViewMode: true } };
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

		const stockCards = this.props.stocks.map((stock) => {
			return (<Stock
				onClick={this.viewStock}
				key={stock.Id}
				stock={stock}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='stock-view'>
				{stockCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addStock}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

StockList.defaultProps = {
	stocks: []
}

StockList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	stocks: PropTypes.array,
	open: PropTypes.bool,
}

StockList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	stocks: state.stocks.stocks,
	hasOpenMessage: !!state.main.message.open
}))(StockList);