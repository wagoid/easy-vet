import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { userType, dateFormat } from '../helpers/valueDecode';
import { floatingActionStyles } from '../helpers/util';

import CostumerCard from './CostumerCard';
import * as CostumerActions from './actions';

class CostumerList extends Component {

	constructor(...args) {
		super(...args);
		this.addCostumer = this.addCostumer.bind(this);
		this.viewCostumer = this.viewCostumer.bind(this);
		this.actions = bindActionCreators(CostumerActions, this.props.dispatch);
	}

	componentDidMount() {
		if (!this.props.costumers.length) {
			this.actions.fetchCostumers();
		}
	}

	getStyles() {
		return {
			addContent: floatingActionStyles(this.props.hasOpenMessage)
		};
	}

	addCostumer() {
		this.context.router.push('/costumer/form')
	}

	viewCostumer(costumer) {
		let newLocation =  { ...this.props.location, pathname: '/costumer/form' , state: { costumerId: costumer.Id, inViewMode: true } };
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

		const costumerCards = this.props.costumers.map((costumer) => {
			return (<CostumerCard
				onClick={this.viewCostumer}
				key={costumer.Id}
				costumer={costumer}
				keyReplacements={keyReplacements}
				valueMasks={valueMasks}
			/>);
		});
		return (
			<div id='costumer-view'>
				{costumerCards}
				<FloatingActionButton
					style={styles.addContent}
					onTouchTap={this.addCostumer}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

CostumerList.defaultProps = {
	costumers: []
}

CostumerList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	costumers: PropTypes.array,
	open: PropTypes.bool,
}

CostumerList.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
}

export default connect(state => ({
	costumers: state.costumer.costumers,
	hasOpenMessage: !!state.main.message.open
}))(CostumerList);