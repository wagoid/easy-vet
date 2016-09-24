import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
//TODO: create an EmployeeSelect and use it
import CostumerSelect from '../costumer/CostumerSelect';

class FilterDialog extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: props.defaultStartDate
		};
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
	}

	handleStartDateChange(event, startDate) {
		this.setState({...this.state, startDate});
		if (this.props.onStartDateChange) {
			this.props.onStartDateChange(startDate);
		}
	}

	render() {
		return (
			<div>
				<CostumerSelect floatingLabelText="Veterinary" />

				<DatePicker
					name="StartDate"
					onChange={this.handleStartDateChange}
					autoOk={true}
					floatingLabelText="Start date"
					value={this.state.startDate}
					/>
			</div>
		);
	}
}

FilterDialog.propTypes = {
	defaultStartDate: PropTypes.object.isRequired,
	onStartDateChange: PropTypes.func,
	onVeterinaryChange: PropTypes.func
};

export default FilterDialog;