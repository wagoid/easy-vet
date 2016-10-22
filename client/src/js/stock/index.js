import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { floatingActionStyles } from '../styles/actions';

import StockCard from './StockCard';
import * as StockActions from './actions';

class StockList extends Component {

	constructor(...args) {
		super(...args);
		this.addStock = this.addStock.bind(this);
		this.viewStock = this.viewStock.bind(this);
		this.actions = bindActionCreators(StockActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.stocks.length) {
			this.actions.fetchStocks();
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
			
		};
		//TODO: add value masks for enums
		let valueMasks = {
		}

		const stockCards = this.props.stocks.map((stock) => {
			return (<StockCard
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
	stocks: state.stock.stocks,
	hasOpenMessage: !!state.main.message.open
}))(StockList);