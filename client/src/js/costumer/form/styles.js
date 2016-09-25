import { floatingActionStyles, additionalFloatingActionStyles } from '../../styles/actions';
import paper from '../../styles/paper';

export default function getStyles(hasOpenMessage) {
	return {
		floatingAction: floatingActionStyles(hasOpenMessage),
		additionalFloatingAction: additionalFloatingActionStyles(),
		paper,
		dividerContainer: {
			marginTop: '20px'
		}
	};
}