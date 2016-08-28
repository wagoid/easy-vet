import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';
class MessageView extends Component {

	constructor(...args) {
		super(...args);
	}

	render() {
		return (
				<Snackbar
					open={this.props.open}
					message={this.props.message || ''}
					autoHideDuration={4000}
				/>
		);
	}
}

MessageView.propTypes = {
	open: PropTypes.bool,
	type: PropTypes.string,
	message: PropTypes.string
}

export default connect(state => ({
	open: !!state.main.message.open,
	message: state.main.message.text,
	type: state.main.message.type
}))(MessageView);