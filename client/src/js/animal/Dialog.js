import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';

class AnimalDialog extends Component{
	render() {
		return (
			<Dialog
				title={this.props.title}
				actions={this.props.actions}
				modal={this.props.modal}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
				autoScrollBodyContent
			>
				{/* TODO: implement dialog content */}
			</Dialog>
		);
	}
}

AnimalDialog.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	actions: PropTypes.array,
	modal: PropTypes.bool,
	open: PropTypes.bool,
	onRequestClose: PropTypes.func.isRequired
}

AnimalDialog.defaultProps = {
	modal: false,
	open: false
}

export default AnimalDialog;