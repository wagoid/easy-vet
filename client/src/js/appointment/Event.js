import React, { Component, PropTypes } from 'react';
import getStyles from './styles';
import { weekDaysFromStart, dayHoursFromMidNight } from '../helpers/util';

class Event extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		if (this.props.onTouchTap) {
			this.props.onTouchTap(event, this.props.event);
		}
	}

	render() {
		return (
			<div style={this.props.style} onTouchTap={this.handleClick}> {this.props.event.Name} </div>
		);
	}
}

Event.propTypes = {
	event: PropTypes.object.isRequired,
	onTouchTap: PropTypes.func
}

export default Event;