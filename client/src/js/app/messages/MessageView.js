import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';
import { bindActionCreators } from 'redux';
import { closeMessageView } from './actions';

class MessageView extends Component {

	constructor(...args) {
		super(...args);
		this._closeMessageView = this._closeMessageView.bind(this);
	}

	_closeMessageView() {
		this.props.dispatch(closeMessageView());
	}

	render() {

		if (this.props.open) {
			setTimeout(this._closeMessageView, this.props.automaticFadeTimeout || 4000);
		}
		

		return (
				<Snackbar
					open={this.props.open}
					message={this.props.message || ''}
					onRequestClose={this._closeMessageView}
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