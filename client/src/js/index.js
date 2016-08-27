// import React from 'react';
// import ReactDOM from 'react-dom';
// import Home from './home';

// window.onload = function () {
// 	ReactDOM.render(
// 		<Home/>,
// 		document.querySelector('body > div')
// 	);

// };

//import 'babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

render(<Root />, document.getElementById('root'));