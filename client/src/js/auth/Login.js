import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { TextField, Paper, RaisedButton, MuiThemeProvider } from 'material-ui';
import Send from 'material-ui/svg-icons/content/send';
import { connect } from 'react-redux';
import * as authActions from './actions';
import getStyles from '../employee/form/styles';
import * as validations from '../helpers/validations';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Cpf: '',
			Password: '',
			error: {

			}
		};
		this.validations = {
			Cpf: { required: {} },
			Password: { required: {} }
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		this.actions = bindActionCreators(authActions, this.props.dispatch);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleBlur(event) {
		let { value, name } = event.target;
		let errorText = this.getErrorText(evalue, name);
		staget[name] = value;
		let error = { ...this.state.error, [name]: errorText };
		
		this.setState({
			employee,
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

	submitLogin() {
		let error = {...this.state.error};
		this.setErrors(error);
		let hasError = Object.keys(error).some(errorKey => !!error[errorKey]);

		if (hasError) {
			this.setState({ error });
		} else {
			this.actions.requestLogin({ Cpf: this.state.Cpf, Password: this.state.Password })
				.then(responseData => {
					if (responseData) {
						this.context.router.push('/');
					}
				});
		}
	}

	setErrors(error) {
		error.Cpf = this.getErrorText(this.state.Cpf, 'Cpf');
		error.Password = this.getErrorText(this.state.Password, 'Password');
	}

	render() {
		let styles = getStyles();

		return (
			<MuiThemeProvider>
				<Paper style={styles.paper}>
					<TextField
						name="Cpf"
						type="text"
						style={ { display: 'block' } }
						floatingLabelText="Cpf"
						value={this.props.Cpf}
						onChange={this.handleChange}
						onBlur={this.onBlur}
					/>

					<TextField
						name="Password"
						type="password"
						style={ { display: 'block' } }
						floatingLabelText="Password"
						value={this.props.Password}
						onChange={this.handleChange}
						onBlur={this.onBlur}
					/>

					<RaisedButton
						label="submit"
						style={styles.button}
						icon={<Send />}
						onTouchTap={this.submitLogin}
					/>

				</Paper>
			</MuiThemeProvider>
		);
	}
}

Login.childContextTypes = {
	muiTheme: PropTypes.object
};

Login.contextTypes = {
	router: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired
};

export default connect((state, ownProps) => ({
	
}))(Login);
