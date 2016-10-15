import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';

class AppointmentsSimpleList extends Component {

	constructor(props) {
		super(props);
	}

	mapAppointmentsToCards(appointments) {
		var cards = appointments.map((appointment, index) => {
			return (
				<Card key={index} style={{margin: '10px'}}>
					<CardHeader
						title={appointment.Name}
					/>
					<CardText> Date: {moment(appointment.Date).format('L')} </CardText>
					<CardText> Description: {appointment.Description} </CardText>
					<CardText> Animal: {appointment.Animal.Name} </CardText>
					<CardText> Start: {appointment.StartDate? moment(appointment.StartDate).format('L') : ''} </CardText>
					<CardText> End: {appointment.EndDate? moment(appointment.EndDate).format('L') : ''} </CardText>
				</Card>
			)
		});

		return cards;
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