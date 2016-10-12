import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';

class AnimalDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animal: {
				Name: '',
				Breed: '',
				Type: 0,
				Owner: props.owner
			},
			error: {},
			open: true
		};
		this.validations = {
			Name: { required: {} },
			Breed: { required: {} }
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleChange() {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	handleBlur() {
		this.updateFieldError(event.target.value, event.target.name);
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

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
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

	render() {
		return (
			<Dialog
				title={this.props.title}
				actions={[<FlatButton key={"addAnimalCancel"} label='Cancel' onTouchTap={onCancel} />,
				<FlatButton key={"addAnimalOk"} label='OK' primary onTouchTap={onOk} />]}
				open={this.state.open}
				onRequestClose={onCancel}
				autoScrollBodyContent
			>
				
				<TextField
					type="text"
					name="Name"
					style={{ display: 'block' }}
					value={this.state.Name}
					errorText={this.state.error.Name}
					floatingLabelText="Name"
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>

				<TextField
					type="text"
					name="Breed"
					style={{ display: 'block' }}
					value={this.state.Name}
					errorText={this.state.error.Name}
					floatingLabelText="Breed"
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>

			</Dialog>
		);
	}
}

AnimalDialog.propTypes = {
	title: PropTypes.string.isRequired
}

export default AnimalDialog;