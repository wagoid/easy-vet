import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { TextField, Paper, RaisedButton, MuiThemeProvider } from 'material-ui';
import { connect } from 'react-redux';
import * as authActions from './actions';
import getStyles from './styles';
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
		let errorText = this.getErrorText(value, name);
		let error = { ...this.state.error, [name]: errorText };
		
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

	submitLogin() {
		let error = this.getError();
		let hasError = Object.keys(error).some(errorKey => !!error[errorKey]);
		this.setState({ error });

		if (!hasError) {
			this.actions.requestLogin({ Cpf: this.state.Cpf, Password: this.state.Password })
				.then(responseData => {
					if (responseData) {
						this.context.router.push('/');
					}
				});
		}
	}

	getError() {
		return {
			Cpf: this.getErrorText(this.state.Cpf, 'Cpf'),
			Password: this.getErrorText(this.state.Password, 'Password')
		};
	}

	render() {
		let styles = getStyles();

		return (
			<MuiThemeProvider>
				<Paper style={styles.paper}>
					<TextField
						name='Cpf'
						type='text'
						style={{ display: 'block' }}
						errorText={this.state.error.Cpf}
						floatingLabelText='Cpf'
						value={this.state.Cpf}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						fullWidth
					/>

					<TextField
						name='Password'
						type='password'
						style={{ display: 'block' }}
						errorText={this.state.error.Password}
						floatingLabelText='Password'
						value={this.state.Password}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						fullWidth
					/>

					<RaisedButton
						label='submit'
						fullWidth
						style={{ marginTop: '20px' }}
						primary
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
