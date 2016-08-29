import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar,	Drawer,	RaisedButton,	MenuItem,	MuiThemeProvider } from 'material-ui';
import MessageView from './messages/MessageView';

// Define menu items for LeftNav
let menuItems = [
	{ route: '/', text: 'Home' },
	{ route: 'about', text: 'About' },
	{ route: 'contact', text: 'Contact' },
];

class App extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = {open: false};
		this.handleToggle = this.handleToggle.bind(this);
		this._getSelectedIndex = this._getSelectedIndex.bind(this);
	}

	getChildContext() {
		return {
			muiTheme: this.context.muiTheme
		};
	}

	handleToggle () {
		this.setState({ open: !this.state.open });
	}

	// Get the selected item in LeftMenu
	_getSelectedIndex() {
		let currentItem;
		let selectedIndex;

		for (let i = menuItems.length - 1; i >= 0; i--) {
			currentItem = menuItems[i];
			if (currentItem.route && this.context.router.isActive(currentItem.route)) {
				selectedIndex = i;
			}
		}

		return selectedIndex;
	}

	_onLeftNavChange(e, key, payload) {
		// Do DOM Diff refresh
		this.context.router.transitionTo(payload.route);
	}

	render() {
		return (
			<div id="page-container">
					<Drawer
						docker={false}
						open={this.state.open}
						onRequestChange={open => this.setState({open})}
					>
						<RaisedButton
							label="Toggle drawer"
							onTouchTap={this.handleToggle}
						/>

						<MenuItem onTouchTap={this.handleToggle}>WOW</MenuItem>
					</Drawer>

				<header>
					<AppBar title='Easy Vet' onLeftIconButtonTouchTap={this.handleToggle} />
				</header>

				<section id="content">
					{this.props.children}
				</section>

				<section id="message-view">
					<MessageView />
				</section>

			</div>
		);
	}

}

App.childContextTypes = {
	muiTheme: PropTypes.object
};

App.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
};

export default class AppProvider extends Component {
	constructor(...args) {
		super(...args);
	}

	render() {
		return (
			<MuiThemeProvider>
				<App {...this.props} />
			</MuiThemeProvider>
		);
	}
}