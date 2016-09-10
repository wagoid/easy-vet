import { floatingActionStyles, additionalFloatingActionStyles } from '../../helpers/util';

export default function getStyles(hasOpenMessage) {
	return {
		floatingAction: floatingActionStyles(hasOpenMessage),
		additionalFloatingAction: additionalFloatingActionStyles(),
		paper: {
			padding: window.screen.width > 400? '14px 24px 24px' : '14px 5px 24px 5px',
			margin: '5px auto 0px auto',
			width: '50%',
			minWidth: '300px'
		},
		dividerContainer: {
			marginTop: '20px'
		},
		addShoppingCart: {
			marginTop: '20px'
		}
	};
}