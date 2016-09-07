import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import bluebird from 'bluebird';
import 'isomorphic-fetch';
import axios from 'axios';

//TODO: move these config stuff to a config module
window.Promise = bluebird;
Promise.config({
	longStackTraces: true,
	warnings: true
});

axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.headers.put['Content-Type'] = 'text/plain';

render(<Root />, document.getElementById('root'));