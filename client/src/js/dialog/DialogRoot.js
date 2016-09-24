import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

class DialogRoot extends Component {
	constructor(props = {}) {
		super(props);
	}
	render() {
		let props = this.props.dialog.props,
			Component = this.props.dialog.component,
			componentProps = this.props.dialog.componentProps || {};
			
		if (!Component) {
			return (
				<Dialog open={false} modal={false}>
					
				</Dialog>
			);
		} else {
			return (
				<Dialog {...props}>
					<Component {...componentProps} />
				</Dialog>
			);
		}
	}
}

DialogRoot.PropTypes = {
	dialog: PropTypes.object
};

export default connect((state, ownProps) => ({
	dialog: state.dialog,
}))(DialogRoot);