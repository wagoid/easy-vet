import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { TextField } from 'material-ui';

class DiagnosisDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			appointment: props.appointment || {}
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({appointment: {...this.state.appointment, Diagnosis: event.target.value}});
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}

	render() {
		return (
			<div>
				<TextField
					name='Diagnosis'
					floatingLabelText='Diagnosis'
					readOnly={!this.state.appointment.StartDate || (!!this.state.appointment.StartDate && !!this.state.appointment.EndDate)}
					multiLine
					onChange={this.handleChange}
					value={this.state.appointment.Diagnosis || ''}
					style={{maxHeight: '200px', overflow: 'auto'}}
					underlineShow={false}
					fullWidth
				/>
			</div>
		);
	}
}

DiagnosisDialog.propTypes = {
	appointment: PropTypes.object.isRequired,
	onChange: PropTypes.func
};

function mapStateToProps(state, ownProps) {
	return ownProps;
}

export default connect(mapStateToProps)(DiagnosisDialog);