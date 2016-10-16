import { floatingActionStyles, additionalFloatingActionStyles } from '../../styles/actions';
import paper from '../../styles/paper';
import errorText from '../../styles/errorText';

export default function getStyles(hasOpenMessage) {
	return {
		floatingAction: floatingActionStyles(hasOpenMessage),
		secondButton: { ...additionalFloatingActionStyles(), right: '76px' },
		thirdButton: { ...additionalFloatingActionStyles(), right: '137px' },
		firstButton: additionalFloatingActionStyles(),
		paper,
		dividerContainer: {
			marginTop: '20px'
		},
		addShoppingCart: {
			marginTop: '20px'
		},
		errorText,
		block: {
			display: 'block'
		}
	};
}