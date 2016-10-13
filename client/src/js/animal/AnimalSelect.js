import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import * as animalActions from './actions';

class AnimalSelect extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
		this.actions = bindActionCreators(animalActions, this.props.dispatch);
	}

	componentDidMount() {
		if (this.props.costumerId) {
			this.actions.fetchAnimals(this.props.costumerId, this.props.fetchUrl);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.costumerId && (this.props.costumerId !== nextProps.costumerId)) {
			this.actions.fetchAnimals(nextProps.costumerId, this.props.fetchUrl);
		}
	}

	handleChange(event, index, value) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, index, value, this.props.animals[index]);
		}
	}

	render() {
		var animalOptions = this.props.animals.map((animal, index) => {
			return (
				<MenuItem key={index} value={animal.Id} primaryText={animal.Name} />
			);
		});

		return (
			<SelectField
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				disabled={this.props.disabled}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{animalOptions}
			</SelectField>
		);
	}
}

AnimalSelect.PropTypes = {
	costumerId: PropTypes.number,
	fetchUrl: PropTypes.string.isRequired,
	animals: PropTypes.array,
	floatingLabelText: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool
}

AnimalSelect.defaultProps = {
	animals: [],
	disabled: false
}


export default connect((state, ownProps) => ({
	animals: state.animal.animals
}))(AnimalSelect);