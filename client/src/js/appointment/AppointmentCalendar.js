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
import FilterDialog from './FilterDialog';
import { openMessageView } from '../app/messages/actions';

let defaultStart = moment();

class AppointmentCalendar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: moment()
		}
		this.filter = {
			startDate: this.state.startDate,
			veterinaryId: null
		};
		this.actions = bindActionCreators({ ...AppointmentActions, setAdditionalFloatingActions }, this.props.dispatch);
		this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.setStartDateFilter = this.setStartDateFilter.bind(this);
		this.setVeterinaryFilter = this.setVeterinaryFilter.bind(this);
		this.openFilterDialog = this.openFilterDialog.bind(this);
		this.handleEventClick = this.handleEventClick.bind(this);
		this.filterAppointments = this.filterAppointments.bind(this);
	}

	handleEventClick(event, appointment) {
		//Dont let the event bubble to handleCellClick;
		event.stopPropagation();
		console.log(appointment);
		let newLocation =  { ...this.props.location, pathname: '/appointment/form' , state: { appointment, inViewMode: true } };
		this.context.router.push(newLocation);
	}

	handleCellClick(day, row) {
		let { veterinaryId } = this.state;
		let date = moment(day.momentDay).hour(row.hour).minute(0).second(0)._d;
		if (veterinaryId) {
			var rowDayEvents = row.days.find(rowDay => rowDay.day === day.day).events;
			if (rowDayEvents.length) {
				this.props.dispatch(openMessageView({
					type: 'creteAppointmentError',
					text: 'There is already an appointment scheduled for the selected time.'
				}));
			} else {
				this.createNewAppointment(date, veterinaryId);
			}
			
		} else {
			this.props.dispatch(openMessageView({
				type: 'creteAppointmentError',
				text: 'Please filter by a veterinary before creating an appointment.'
			}));
		}
	}

	createNewAppointment(date, veterinaryId) {
		let newLocation =  {
			...this.props.location,
			pathname: '/appointment/form' ,
			state: { date, veterinaryId }
		};
		this.context.router.push(newLocation);
	}

	componentDidMount() {
		if (!this.props.appointments.length) {
			this.actions.fetchAppointments();
		}

		let styles = getStyles();
		let filterAppointmentsAction = (
			<FloatingActionButton onTouchTap={this.openFilterDialog} key='appointmentFilterAction' style={styles.filterAppointments} secondary>
				<FilterList />
			</FloatingActionButton>
		);
		let previousWeekAction = (
			<FloatingActionButton onTouchTap={this.addWeeksToStartDate.bind(this, -1)} key='appointmentPrevioustWeekAction' style={styles.previousWeekAction} secondary>
				<ArrowBack />
			</FloatingActionButton>
		);
		let nextWeekAction = (
			<FloatingActionButton onTouchTap={this.addWeeksToStartDate.bind(this, 1)} key='appointmentNextWeekAction' style={styles.nextWeekAction} secondary>
				<ArrowForward />
			</FloatingActionButton>
		);
		
		this.actions.setAdditionalFloatingActions([filterAppointmentsAction, previousWeekAction, nextWeekAction]);
	}

	addWeeksToStartDate(weeks) {
		this.setState({ start: this.state.startDate.add(weeks, 'week') });
	}

	openFilterDialog() {
		this.actions.filterDialog({
			component: FilterDialog,
			onRequestClose: this.resetFilter,
			onOk: this.updateStateFromFilter,
			onCancel: this.resetFilter,
			componentProps: {
				onStartDateChange: this.setStartDateFilter,
				onVeterinaryChange: this.setVeterinaryFilter,
				defaultStartDate: this.state.startDate._d,
				defaultVeterinary: this.state.veterinaryId
			}
		});
	}

	updateStateFromFilter() {
		this.actions.closeDialog();
		this.setState({
			startDate: moment(this.filter.startDate),
			veterinaryId: this.filter.veterinaryId
		});
	}

	resetFilter() {
		this.filter = {
			startDate: this.state.startDate,
			veterinaryId: this.state.veterinaryId
		};
		this.actions.closeDialog();
	}

	setStartDateFilter(startDate) {
		this.filter.startDate = startDate;
	}

	setVeterinaryFilter(event, index, veterinaryId) {
		this.filter.veterinaryId = veterinaryId;
	}

	componentWillUnmount() {
		this.actions.setAdditionalFloatingActions([]);
	}

	getRows(weekDays, dayHours, events) {
		let rows = [];
		let eventsMap = {};
		events.forEach(event => {
			if (!event.Date.format) {
				event.Date = moment(event.Date);
			}
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
			<div key={'calendarheaderspacer'} style={styles.rowHourCell} />
		));

		return headerWeekDays;
	}

	filterAppointments(appointments) {
		let filteredAppointments = appointments;
		if (this.state.veterinaryId) {
			filteredAppointments = appointments.filter(appointment => {
				return appointment.Veterinary.Id === this.state.veterinaryId;
			});
		}
		

		return filteredAppointments;
	}

	render() {
		let styles = getStyles();
		let weekDays = weekDaysFromStart(this.state.startDate);
		let dayHours = dayHoursFromMidNight();
		let rows = this.getRows(weekDays, dayHours, this.filterAppointments(this.props.appointments));
		let calendarRows = rows.map((row, index) => {
			let rowDays = row.days.map((day, dayIndex) => {
				let dayEvents = day.events.map((dayEvent, dayEventIndex) => (<Event onTouchTap={this.handleEventClick} style={styles.eventItem} event={dayEvent} key={`calendarhourdayevent${day.day}${dayEventIndex}`} />));
				return (
					<div onTouchTap={this.handleCellClick.bind(this, day, row)} key={`calendarhourday${day.day}`} style={styles.cell}>
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
					<div style={{ minWidth: '900px' }}>
						<div style={styles.header}>
							{this.getHeaderCells(weekDays, styles)}
						</div>
						<Divider style={styles.divider} />
							{calendarRows}
					</div>
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