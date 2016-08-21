import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

window.onload = function () {
	ReactDOM.render(
		<Home/>,
		document.querySelector('body > div')
	);

};
