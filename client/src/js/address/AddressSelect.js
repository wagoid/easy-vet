import React, {Component, PropTypes} from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';

class AddressSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		var addressOptions = this.props.addresses.map((address, index) => {
			let addressText = `${address.StreetType} ${address.StreetName}, nº ${address.Number} - ${address.Neighbourhood}`;
			return (
				<MenuItem key={index} value={address.Id} primaryText={addressText} />
			);
		});

		return (
			<SelectField autoWidth={true} value={this.state.value} onChange={this.handleChange}>
				{addressOptions}
			</SelectField>
		);
	}
}

AddressSelect.PropTypes = {
	addresses: PropTypes.array
}

AddressSelect.defaultProps = {
	addresses: []
}


export default connect((state, ownProps) => ({
	addresses: state.address.addresses
}))(AddressSelect);