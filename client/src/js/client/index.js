import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../helpers/util';

import Client from './Client';
import * as ClientActions from './actions';

class ClientList extends Component {

	constructor(...args) {
		super(...args);
		this.addClient = this.addClient.bind(this);
		this.viewClient = this.viewClient.bind(this);
		this.actions = bindActionCreators(ClientActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.clients.length) {
			this.actions.fetchClients();
		}
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addClient() {
		this.context.router.push('/client/form')
	}

	viewClient(client) {
		let newLocation =  { ...this.props.location, pathname: '/client/form' , state: { clientId: client.Id, inViewMode: true } };
		this.context.router.push(newLocation);
	}

	render() {
		const styles = this.getStyles();
		let keyReplacements = {
			BirthDate: 'Birth Date'
		};
		let valueMasks = {
			BirthDate: {
				func: dateFormat,
				mask: 'date'
			},
			Type: {
				func: userType
			}
		}

		const clientCards = this.props.clients.map((client) => {
			return (<Client
				onClick={this.viewClient}
				key={client.Id}
				client={client}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='client-view'>
				{clientCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addClient}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

ClientList.defaultProps = {
	clients: []
}

ClientList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	clients: PropTypes.array,
	open: PropTypes.bool,
}

ClientList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	clients: state.client.clients,
	hasOpenMessage: !!state.main.message.open
}))(ClientList);