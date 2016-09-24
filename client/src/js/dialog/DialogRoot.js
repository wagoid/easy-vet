import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class DialogRoot extends Component {
	constructor(props = {}) {
		super(props);
	}
	render() {
		let props = this.props.dialog.props,
			Component = this.props.dialog.component;

		if (!Component) {
			return <div> </div>;
		} else {
			return <Component key={1} {...props} />;
		}
	}
}

DialogRoot.PropTypes = {
	dialog: PropTypes.object
};

export default connect((state, ownProps) => ({
	dialog: state.dialog,
}))(DialogRoot);