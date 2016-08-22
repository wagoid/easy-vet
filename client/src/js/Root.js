import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
//Todo: Implement
import { store } from './app/configureStore';
//TODO:Implement
//import * as hooks from './hooks';
// Redux DevTools
//import DevTools from './containers/DevTools';
import Home from './home/Home';
//import Login from './auth/Login';

//hooks.bootstrap(store)();

export default class Root extends Component {
  render() {
    return (
        <div>
          <Provider store={store}>
            <Router history={browserHistory}>
              <Route path='/' component={Home} />
              <Route path='/easy-vet/client' component={Home} />
              {/*<Route path='/post/:id/edit' component={Draft} onEnter={hooks.editPost(store)}/>*/}
              {/*<Route path='/post/new' component={Draft}/>*/}
              {/*<Route path='/login' component={Login}/>*/}
            </Router>
          </Provider>
          {/*<DevTools store={store} />*/}
        </div>
    );
  }
};