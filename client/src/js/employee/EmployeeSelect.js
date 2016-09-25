import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as employeeActions from './actions';

class EmployeeSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(employeeActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.employees.length) {
			this.actions.fetchEmployees();
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value);
		}
	}

	getEmployeeOptions() {
		let { employees } = this.props;
		if (this.props.optionsFilter) {
			employees = employees.filter(this.props.optionsFilter);
		}

		return employees.map((employee, index) => {
			let employeeText = `${employee.Cpf} - ${employee.Name}`;
			return (
				<MenuItem key={index} value={employee.Id} primaryText={employeeText} />
			);
		});
	}

	render() {
		let employeeOptions = this.getEmployeeOptions();

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{employeeOptions}
			</SelectField>
		);
	}
}

EmployeeSelect.PropTypes = {
	employees: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool,
	optionsFilter: PropTypes.func
}

EmployeeSelect.defaultProps = {
	employees: []
}


export default connect((state, ownProps) => ({
	employees: state.employee.employees
}))(EmployeeSelect);