import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as addressActions from './actions';

class AddressSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(addressActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.addresses.length) {
			this.actions.fetchAddresses();
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		var addressOptions = this.props.addresses.map((address, index) => {
			let streetName = this.getSanitizedAddressName(address);
			let addressText = `${address.StreetType} ${streetName}, nº ${address.Number} - ${address.Neighbourhood}`;
			return (
				<MenuItem key={index} value={address.Id} primaryText={addressText} />
			);
		});

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				autoWidth={true}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{addressOptions}
			</SelectField>
		);
	}

	getSanitizedAddressName(address) {
		let { StreetName, StreetType} = address;
		let startsWithAddressType = StreetName.indexOf(StreetType) === 0;
		return startsWithAddressType? StreetName.slice(StreetType.length + 1, StreetName.length) : StreetName;
	}
}

AddressSelect.PropTypes = {
	addresses: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired
}

AddressSelect.defaultProps = {
	addresses: []
}


export default connect((state, ownProps) => ({
	addresses: state.address.addresses
}))(AddressSelect);