import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as stockActions from './actions';

class StockSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(stockActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.stocks.length) {
			this.actions.fetchStocks();
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		let stocksToShow;
		if (Object.keys(this.props.exclusionStockIds).length > 0) {
			stocksToShow = this.props.stocks.filter(stock => !this.props.exclusionStockIds[stock.Id]);
		} else {
			stocksToShow = this.props.stocks;
		}
		
		let stockOptions = stocksToShow.map((stock, index) => {
			let stockText = `${stock.Name} - R$${stock.Price}`;
			return (
				<MenuItem key={index} value={stock.Id} primaryText={stockText} />
			);
		});

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{stockOptions}
			</SelectField>
		);
	}
}

StockSelect.PropTypes = {
	stock: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool,
	exclusionStockIds: PropTypes.object
}

StockSelect.defaultProps = {
	stock: [],
	exclusionStockIds: {}
}


export default connect((state, ownProps) => ({
	stock: state.stock.stocks
}))(StockSelect);