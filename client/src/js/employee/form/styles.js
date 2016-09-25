import { floatingActionStyles } from '../../styles/actions';
import paper from '../../styles/paper';

export default function getStyles(hasOpenMessage) {
	return {
		floatingAction: floatingActionStyles(hasOpenMessage),
		paper, 
		dividerContainer: {
			marginTop: '20px'
		}
	};
}