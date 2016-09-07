import { MuiThemeProvider } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import DialogRoot from '../dialog/DialogRoot';

class ExternalAppProvider extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<ExternalApp { ...this.props } />
			</MuiThemeProvider>
		);
	}
}

class ExternalApp extends Component {

	constructor(...args) {
		super(...args);
	}
	render() {
		return (
			<section id="external-content">
				<DialogRoot />
				{this.props.children}
			</section>
		);
	}
}

ExternalApp.childContextTypes = {
	muiTheme: PropTypes.object
};

ExternalApp.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
};


export default ExternalAppProvider;