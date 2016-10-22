import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar,	Drawer,	RaisedButton,	MenuItem,	MuiThemeProvider } from 'material-ui';
import WorkIcon from 'material-ui/svg-icons/action/work';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MessageView from './messages/MessageView';
import { parseToArray } from '../helpers/util';
import DialogRoot from '../dialog/DialogRoot';

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
	}

	getChildContext() {
		return {
			muiTheme: this.context.muiTheme
		};
	}

	getStyles() {
		return {
			menuItemAnchor: {
				textDecoration: 'none'
			}
		}
	}

	handleToggle () {
		this.setState({ open: !this.state.open });
	}

	handleMenuClick(route) {
		return () => {
			this.context.router.push(route);
			this.setState({ open: !this.state.open });
		};
	}

	_getCurrentRouteName() {
		var route = this.props.routes.find(route => route.path === this.props.location.pathname);
		return route? route.name : 'Home';
	}

	render() {
		let styles = this.getStyles();
		return (
			<div id='page-container'>
				<Drawer
					docker={false}
					open={this.state.open}
					onRequestChange={open => this.setState({open})}
				>

					<MenuItem onTouchTap={this.handleMenuClick('/')} leftIcon={<HomeIcon />} primaryText='Home' />
					<MenuItem onTouchTap={this.handleMenuClick('/employee')} leftIcon={<WorkIcon />} primaryText='Employee'  />
					<MenuItem onTouchTap={this.handleMenuClick('/product')} leftIcon={<WorkIcon />} primaryText='Product'  />
					<MenuItem onTouchTap={this.handleMenuClick('/costumer')} leftIcon={<WorkIcon />} primaryText='Costumer'  />
					<MenuItem onTouchTap={this.handleMenuClick('/sale')} leftIcon={<WorkIcon />} primaryText='Sale'  />
					<MenuItem onTouchTap={this.handleMenuClick('/appointment')} leftIcon={<WorkIcon />} primaryText='Appointment'  />
					<MenuItem onTouchTap={this.handleMenuClick('/stock')} leftIcon={<WorkIcon />} primaryText='Stock'  />

				</Drawer>

				<header>
					<AppBar title={this._getCurrentRouteName()} onLeftIconButtonTouchTap={this.handleToggle} >
						{parseToArray(this.props.additionalFloatingActions)}
					</AppBar>
				</header>

				<section id='content'>
					{this.props.children}
				</section>

				<section id='message-view'>
					<MessageView />
				</section>

				<section id='dialog-root'>
					<DialogRoot />
				</section>

			</div>
		);
	}

}

App.PropTypes = {
	additionalFloatingActions: PropTypes.array
};

App.childContextTypes = {
	muiTheme: PropTypes.object
};

App.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired
};

const ConnectedApp = connect((state, ownProps) => ({
	additionalFloatingActions: state.main.additionalFloatingActions
}))(App);

export default class AppProvider extends Component {
	constructor(...args) {
		super(...args);
	}

	render() {
		return (
			<MuiThemeProvider>
				<ConnectedApp {...this.props} />
			</MuiThemeProvider>
		);
	}
}