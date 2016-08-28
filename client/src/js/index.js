import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import bluebird from 'bluebird';
import 'isomorphic-fetch';

window.Promise = bluebird;
Promise.config({
	longStackTraces: true,
	warnings: true
});

render(<Root />, document.getElementById('root'));