import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
//TODO: create an EmployeeSelect and use it
import EmployeeSelect from '../employee/EmployeeSelect';

class FilterDialog extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: props.defaultStartDate
		};
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEmployeeSelectChange = this.handleEmployeeSelectChange.bind(this);
	}

	handleStartDateChange(event, startDate) {
		this.setState({...this.state, startDate});
		if (this.props.onStartDateChange) {
			this.props.onStartDateChange(startDate);
		}
	}

	handleEmployeeSelectChange(event, index, value) {
		if (this.props.onVeterinaryChange) {
			this.props.onVeterinaryChange(event, index, value);
		}
	}

	filterVeterinaryEmployee(employee) {
		return employee.Type === 3;
	}

	render() {
		return (
			<div>
				<EmployeeSelect
					floatingLabelText="Veterinary"
					optionsFilter={this.filterVeterinaryEmployee} 
					fullWidth={true}
					onChange={this.handleEmployeeSelectChange}
					defaultValue={this.props.defaultVeterinary}
					/>

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
	defaultVeterinary: PropTypes.number,
	onStartDateChange: PropTypes.func,
	onVeterinaryChange: PropTypes.func
};

export default FilterDialog;