import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { dateFormat } from '../helpers/util';

import Employee from './Employee';
import * as EmployeeActions from './actions';

class EmployeeView extends Component {

	constructor(...args) {
		super(...args);
		this.addEmployee = this.addEmployee.bind(this);
		this.actions = bindActionCreators(EmployeeActions, this.props.dispatch);
	}

	componentDidMount() {
		this.actions.fetchEmployees();
	}

	getStyles() {
		return {
			addContent: {
				position: 'fixed',
				right: 20,
				bottom: 20,
				zIndex: 100
			}
		};
	}

	addEmployee() {
		this.context.router.push('/employee/new')
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
			}
		}

		const employeeCards = this.props.employees.map((employee) => {
			return (<Employee
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

EmployeeView.defaultProps = {
	employees: []
}

EmployeeView.propTypes = {
	dispatch: PropTypes.func.isRequired,
	employees: PropTypes.array
}

EmployeeView.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	employees: state.employee.employees
}))(EmployeeView);