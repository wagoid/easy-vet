import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';

class FilterDialog extends Component{
	render() {
		return (
			<Dialog
				title={this.props.title}
				actions={this.props.actions}
				modal={this.props.modal}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
			>
				uabafet
			</Dialog>
		);
	}
}

FilterDialog.propTypes = {
	title: PropTypes.string.isRequired,
	actions: PropTypes.array,
	modal: PropTypes.bool,
	open: PropTypes.bool,
	onRequestClose: PropTypes.func.isRequired
}

FilterDialog.defaultProps = {
	modal: false,
	open: false
}

export default FilterDialog;