import React from 'react';
import { render } from 'react-dom';
import jszip from 'jszip'
import Root from './Root';
import bluebird from 'bluebird';
import 'isomorphic-fetch';
import axios from 'axios';
import moment from 'moment';

window.JSZip = jszip;
window.XLSX = require('xlsx');

//TODO: move these config stuff to a config module
window.Promise = bluebird;
Promise.config({
	longStackTraces: true,
	warnings: true
});
window.moment = moment;

axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.headers.put['Content-Type'] = 'text/plain';

render(<Root />, document.getElementById('root'));