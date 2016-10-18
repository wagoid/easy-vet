import { floatingActionStyles, additionalFloatingActionStyles } from '../../styles/actions';
import paper from '../../styles/paper';
import errorText from '../../styles/errorText';

export default function getStyles(hasOpenMessage) {
	return {
		floatingAction: floatingActionStyles(hasOpenMessage),
		additionalFloatingAction: additionalFloatingActionStyles(),
		paper,
		dividerContainer: {
			marginTop: '20px'
		},
		addShoppingCart: {
			marginTop: '20px'
		},
		errorText
	};
}