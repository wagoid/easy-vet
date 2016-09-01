import React, {Component, PropTypes} from 'react';
import { EMPLOYEE_TYPES } from '../helpers/valueDecode';
import { SelectField, MenuItem } from 'material-ui';

class EmployeeTypes extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue || 1};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	render() {
		var employeeTypeOptions = Object.keys(EMPLOYEE_TYPES).map(index => {
			index = Number.parseInt(index);
			let employeeType = EMPLOYEE_TYPES[index];
			return (
				<MenuItem key={index} value={index} name={employeeType.replace(' ', '')} primaryText={employeeType} />
			);
		});

		return (
			<SelectField fullWidth={this.props.fullWidth} value={this.state.value} onChange={this.handleChange}>
				{employeeTypeOptions}
			</SelectField>
		);
	}
}

EmployeeTypes.PropTypes = {
	fullWidth: PropTypes.bool
}

export default EmployeeTypes;