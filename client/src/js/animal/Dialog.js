import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatButton, Dialog, TextField, SelectField, MenuItem } from 'material-ui';
import textFieldStyle from '../styles/textField';
import * as validations from '../helpers/validations';
import * as actions from './actions';

class AnimalDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			animal: {
				Name: '',
				Type: 0,
				Gender: 'Male',
				Breed: '',
				Owner: props.owner
			}
		};
		this.validations = {
			Name: { required: {}},
			Breed: { required: {}}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.actions = bindActionCreators(actions, this.props.dispatch);
	}

	handleGenderChange(event, index, value) {
		this.setState({
			animal: {...this.state.animal, Gender: value}
		});
	}

	handleChange(event, value, name) {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let animal = { ...this.state.animal, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			animal,
			error
		});
	}

	getErrorText(value, fieldName, validationsDefintion = this.validations) {
		let errorText = '';

		let validation = validationsDefintion[fieldName];
		if (validation) {
			Object.keys(validation).forEach(validationName => {
				let validationParams = validations[validationName];
				if (!validations[validationName](value, validationParams)) {
					errorText = validations.DEFAULT_MESSAGES[validationName](validationParams);
				}
			});
		}

		return errorText;
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
			error
		});
	}

	handleSave() {
		let error = {...this.state.error};
		error.Name = this.getErrorText(this.state.animal.Name, 'Name');
		error.Breed = this.getErrorText(this.state.animal.Breed, 'Breed');
		let hasError = Object.keys(error).some(prop => error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
			this.actions.createAnimal(this.state.animal)
				.then(() => {
					if (this.state.animal.Id > 0) {
						this.actions.closeAnimalDialog(AnimalDialog);
					}
				});
		}
	}

	render() {
		let onCancel = () => this.actions.closeAnimalDialog(AnimalDialog);
		return (
			<Dialog
				title="Add animal"
				actions={[<FlatButton key={"addAnimalCancel"} label='Cancel' onTouchTap={onCancel} />,
				<FlatButton key={"addAnimalOk"} label='Save' primary onTouchTap={this.handleSave} />]}
				open={this.props.open}
				onRequestClose={onCancel}
				autoScrollBodyContent
			>
				
				<TextField
					type="text"
					name="Name"
					style={{ display: 'block' }}
					value={this.state.animal.Name}
					errorText={this.state.error.Name}
					floatingLabelText="Name"
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>

				<TextField
					type="text"
					name="Breed"
					style={{ display: 'block' }}
					value={this.state.animal.Breed}
					errorText={this.state.error.Breed}
					floatingLabelText="Breed"
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>

				<SelectField value={this.state.animal.Gender} onChange={this.handleGenderChange}>
					<MenuItem value="Male" primaryText="Male"  />
					<MenuItem value="Female" primaryText="Female" />
				</SelectField>
			</Dialog>
		);
	}
}

AnimalDialog.propTypes = {
	owner: PropTypes.object.isRequired
}

export default connect(() => ({}))(AnimalDialog);