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
//import createHashHistory from 'history/lib/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* It seems react has already solved the tap problem, but redux-thunk uses it as peer dependency, lets see */
injectTapEventPlugin();

render(<Root />, document.getElementById('root'));