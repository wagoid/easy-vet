import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
	constructor(props, context) {
		super(props, context);
		console.log(props, context);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit (e) {
		e.preventDefault();
		this.context.router.push(`${this._input.value}`);
	}

	render() {
		return null;
	}
}

Home.contextTypes = {
	muiTheme: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired
}

export default Home;