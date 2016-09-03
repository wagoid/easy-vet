import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../helpers/util';

import Employee from './Employee';
import * as EmployeeActions from './actions';

class EmployeeList extends Component {

	constructor(...args) {
		super(...args);
		this.addEmployee = this.addEmployee.bind(this);
		this.viewEmployee = this.viewEmployee.bind(this);
		this.actions = bindActionCreators(EmployeeActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.employees.length) {
			this.actions.fetchEmployees();
		}
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addEmployee() {
		this.context.router.push('/employee/form')
	}

	viewEmployee(employee) {
		let newLocation =  { ...this.props.location, pathname: '/employee/form' , state: { employeeId: employee.Id, inViewMode: true } };
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

		const employeeCards = this.props.employees.map((employee) => {
			return (<Employee
				onClick={this.viewEmployee}
				key={employee.Id}
				employee={employee}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='employee-view'>
				{employeeCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addEmployee}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

EmployeeList.defaultProps = {
	employees: []
}

EmployeeList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	employees: PropTypes.array,
	open: PropTypes.bool,
}

EmployeeList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	employees: state.employee.employees,
	hasOpenMessage: !!state.main.message.open
}))(EmployeeList);