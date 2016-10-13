import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as costumerActions from './actions';

class CostumerSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(costumerActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.costumers.length) {
			this.actions.fetchCostumers();
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value, this.props.costumers[index]);
		}
	}

	render() {
		var costumerOptions = this.props.costumers.map((costumer, index) => {
			let costumerText = `${costumer.Cpf} - ${costumer.Name}`;
			return (
				<MenuItem key={index} value={costumer.Id} primaryText={costumerText} />
			);
		});

		return (
			<SelectField 
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				disabled={this.props.disabled}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{costumerOptions}
			</SelectField>
		);
	}
}

CostumerSelect.PropTypes = {
	costumers: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool
}

CostumerSelect.defaultProps = {
	costumers: [],
	disabled: false
}


export default connect((state, ownProps) => ({
	costumers: state.costumer.costumers
}))(CostumerSelect);