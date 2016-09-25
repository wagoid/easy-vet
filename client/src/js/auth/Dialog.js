import React, { Component, PropTypes } from 'react';

class LoginDialog extends Component {
	render() {
		return (
			<div>
				{this.props.message}
			</div>
		);
	}
}

LoginDialog.propTypes = {
	message: PropTypes.string.isRequired
}

export default LoginDialog;