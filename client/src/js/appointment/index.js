import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FloatingActionButton, Paper, Divider } from 'material-ui';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import moment from 'moment';
import { dateFormat } from '../helpers/valueDecode';
import getStyles from './styles';
import { weekDaysFromStart, dayHoursFromMidNight } from '../helpers/util';
import { setAdditionalFloatingActions } from '../app/appbar/actions';
import * as AppointmentActions from './actions';
import Event from './Event';

let defaultStart = moment();

class AppointmentCalendar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			start: moment()
		}
		this.actions = bindActionCreators({ ...AppointmentActions, setAdditionalFloatingActions }, this.props.dispatch);
		this.openFilterDialog = this.openFilterDialog.bind(this);
		this.handleEventClick = this.handleEventClick.bind(this);
	}

	handleEventClick(event, appointment) {
		//Dont let the event bubble to handleCellClick;
		event.stopPropagation();
		console.log(appointment);
		alert(`${appointment.Name}\n${appointment.Description}`);
	}

	handleCellClick(day) {
		let newLocation =  { ...this.props.location, pathname: '/appointment/form' , state: { day } };
		this.context.router.push(newLocation)
	}

	componentDidMount() {
		if (!this.props.appointments.length) {
			this.actions.fetchAppointments();
		}

		let styles = getStyles();
		let filterAppointmentsAction = (
			<FloatingActionButton onTouchTap={this.openFilterDialog} key='appointmentFilterAction' style={styles.filterAppointments} secondary={true}>
					<FilterList />
			</FloatingActionButton>
		);
		let previousWeekAction = (
			<FloatingActionButton onTouchTap={this.addWeeksToStartDate.bind(this, -1)} key='appointmentPrevioustWeekAction' style={styles.previousWeekAction} secondary={true}>
					<ArrowBack />
			</FloatingActionButton>
		);
		let nextWeekAction = (
			<FloatingActionButton onTouchTap={this.addWeeksToStartDate.bind(this, 1)} key='appointmentNextWeekAction' style={styles.nextWeekAction} secondary={true}>
					<ArrowForward />
			</FloatingActionButton>
		);
		
		this.actions.setAdditionalFloatingActions([filterAppointmentsAction, previousWeekAction, nextWeekAction]);
	}

	addWeeksToStartDate(weeks) {
		this.setState({ start: this.state.start.add(weeks, 'week') })
	}

	openFilterDialog() {

	}

	componentWillUnmount() {
		this.actions.setAdditionalFloatingActions([]);
	}

	getRows(weekDays, dayHours, events) {
		let rows = [];
		let eventsMap = {};
		events.forEach(event => {
			let eventKey = `${event.Date.format('L')}|${event.Date.hour()}`;
			if (!eventsMap[eventKey]) {
				eventsMap[eventKey] = [];
			}
			eventsMap[eventKey].push(event);
		});
		dayHours.forEach(dayHour => {
			let row = {
				hour: dayHour.hour(),
				momentHour: dayHour
			};
			rows.push(row);
			row.days = weekDays.map(weekDay => {
				return {
					day: weekDay.day(),
					momentDay: weekDay,
					events: eventsMap[`${weekDay.format('L')}|${dayHour.hour()}`] || []
				}
			});
		});
		
		return rows;
	}

	getHeaderCells(weekDays, styles) {
		let headerWeekDays = weekDays.map(weekDay => {
			return (
				<div key={`calendarday${weekDay.day()}`} style={styles.headerCell}>
					{weekDay.format('ll')}
				</div>
			);
		});

		headerWeekDays.unshift((
			<div key={'calendarheaderspacer'} style={styles.rowHourCell}></div>
		))

		return headerWeekDays;
	}

	render() {
		let styles = getStyles();
		let weekDays = weekDaysFromStart(this.state.start);
		let dayHours = dayHoursFromMidNight();
		let rows = this.getRows(weekDays, dayHours, this.props.appointments);
		let calendarRows = rows.map((row, index) => {
			let rowDays = row.days.map((day, dayIndex) => {
				let dayEvents = day.events.map((dayEvent, dayEventIndex) => (<Event onTouchTap={this.handleEventClick} style={styles.eventItem} event={dayEvent} key={`calendarhourdayevent${day.day}${dayEventIndex}`} />));
				return (
					<div onTouchTap={this.handleCellClick.bind(this, day)} key={`calendarhourday${day.day}`} style={styles.cell}>
						{dayEvents}
					</div>
				);
			});
			rowDays.unshift((
				<div key={`calendarhourlabel${row.hour}`} style={styles.rowHourCell}> {row.momentHour.format('LT')} </div>
			));
			return (
				<div key={`calendarhour${row.hour}`} style={styles.row}>
					
					{ rowDays }
				</div>
			);
		});

		return (
			<div>
				<Paper style={styles.paper}>
					<div style={styles.header}>
						{this.getHeaderCells(weekDays, styles)}
					</div>
					<Divider style={styles.divider} />
					{calendarRows}
				</Paper>
			</div>
		);
	}
}

AppointmentCalendar.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	appointments: state.appointment.appointments
}))(AppointmentCalendar);