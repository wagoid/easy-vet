import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import * as AppointmentActions from '../actions';
import DiagnosisDialog from './DiagnosisDialog';

class AppointmentCard extends Component {

	constructor(props) {
		super(props);
		this.handleTouchTap = this.handleTouchTap.bind(this);
	}

	handleTouchTap() {
		if (this.props.onTouchTap) {
			this.props.onTouchTap(this.props.appointment);
		}
	}

	render() {
		let { appointment, index } = this.props;
		return (
			<Card key={`appointmentCard${index}`} style={{margin: '10px', cursor: 'pointer'}} onTouchTap={this.handleTouchTap}>
				<CardHeader
					title={appointment.Name}
				/>
				<CardText> Date: {moment(appointment.Date).format('L')} </CardText>
				<CardText> Description: {appointment.Description} </CardText>
				<CardText> Animal: {appointment.Animal.Name} </CardText>
				<CardText> Start: {appointment.StartDate? moment(appointment.StartDate).format('L') : ''} </CardText>
				<CardText> End: {appointment.EndDate? moment(appointment.EndDate).format('L') : ''} </CardText>
			</Card>
		);
	}
}

AppointmentCard.propTypes = {
	appointment: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	onTouchTap: PropTypes.func
}

class AppointmentsSimpleList extends Component {

	constructor(props) {
		super(props);
		this.handleDiagnosisClick = this.handleDiagnosisClick.bind(this);
		this.actions = bindActionCreators(AppointmentActions, this.props.dispatch);
	}

	mapAppointmentsToCards(appointments) {
		var cards = appointments.map(appointment => {
			return (
				<AppointmentCard appointment={appointment} key={appointment.Id} index={appointment.Id} onTouchTap={this.handleDiagnosisClick} />
			);
		});

		return cards;
	}

	handleDiagnosisClick(appointment) {
		let closeDiagnosis = () => this.actions.closeDialog(DiagnosisDialog);
		this.actions.diagnosisDialog({
			component: DiagnosisDialog,
			componentProps: { appointment },
			onRequestClose: closeDiagnosis,
			showActions: false
		});
	}

	render() {
		var filteredAppointments = this.props.appointments.filter(appointment => appointment.AnimalId === this.props.appointment.AnimalId && appointment.id !== this.props.appointment.Id && appointment.Date._d < this.props.appointment.Date._d);
		return (
			<div>
				{this.mapAppointmentsToCards(filteredAppointments)}
			</div>
		);
	}
}

AppointmentsSimpleList.propTypes = {
	appointment: PropTypes.object.isRequired,
	appointments: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		appointments: state.appointment.appointments
	};
}

export default connect(mapStateToProps)(AppointmentsSimpleList);