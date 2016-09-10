import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from "react-tap-event-plugin";
import { configureStore } from './app/configureStore';
import axios from 'axios';
import Home from './home/Home';
import App from './app/App';
import ExternalApp from './app/ExternalApp';
import EmployeeList from './employee';
import EmployeeForm from './employee/form/EmployeeForm';
import ClientList from './client';
import ClientForm from './client/form/ClientForm';

import ProductList from './product';
import ProductForm from './product/form/ProductForm';

import Login from './auth/Login';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
history.listen(loc => console.log('Route changed!', loc));

//TODO: use an initialPath
function getPath(path = '') {
	var baseUrl = process.env.BASE_URL === undefined? '' : process.env.BASE_URL;
	return `${baseUrl}${path? ('/' + path) : path}`;
}

function requireAuth(store, nextState, replace, next) {
	// let authToken = JSON.parse(localStorage.getItem("authToken"));
	// if (!authToken) {
	// 	replace('/login');
	// } else {
	// 	axios.defaults.headers.common['Authorization'] = authToken;
	// }

	next();
}

export default class Root extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<Router history={history}>
						<Route component={ExternalApp}>
							<Route name="Login" path={getPath('login')} component={Login} />
						</Route>
						
						<Route onEnter={requireAuth.bind(this, store)} name="Home" path={getPath()} component={App}>

							<Route name="Employees" path={getPath('employee')} component={EmployeeList} />
							<Route name="Employee" path={getPath('employee/form')} component={EmployeeForm} />
							<Route name="Clients" path={getPath('client')} component={ClientList} />
							<Route name="Client" path={getPath('client/form')} component={ClientForm} />

							<Route name="Products" path={getPath('product')} component={ProductList} />
							<Route name="Product" path={getPath('product/form')} component={ProductForm} />

							<Route name="Just a test Page" path={getPath('*')} component={Home} />
						</Route>
					</Router>
				</Provider>
			</div>
		);
	}
};