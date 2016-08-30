import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from "react-tap-event-plugin";
//Todo: Implement
import { configureStore } from './app/configureStore';
//TODO:Implement
//import * as hooks from './hooks';
// Redux DevTools
//import DevTools from './containers/DevTools';
import Home from './home/Home';
import App from './app/App';
import Employee from './employee';
//import Login from './auth/Login';

//hooks.bootstrap(store)();

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

export default class Root extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<Router history={history}>
						<Route name="Home" path={getPath()} component={App}>

							<Route name="Employee" path={getPath('employee')} component={Employee} />
							
							<Route name="Just a test Page" path={getPath('*')} component={Home} />

							{/*<Route path='/post/:id/edit' component={Draft} onEnter={hooks.editPost(store)}/>*/}
							{/*<Route path='/post/new' component={Draft}/>*/}
							{/*<Route path='/login' component={Login}/>*/}
						</Route>
					</Router>
				</Provider>
				{/*<DevTools store={store} />*/}
			</div>
		);
	}
};