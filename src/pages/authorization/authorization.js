import './authorization.css';
import Handlebars from 'handlebars';
import {tmpl} from './authorization.tmpl.js';
import { Field } from '../../components/Field/field.js';
import {Link} from '../../components/Link/link.js';

export const Main = () => {
	//console.log('Main()');
	return Handlebars.compile(tmpl)({
		login: Field({
			labelName: 'login',
			labelContent: 'Login',
			inputType: 'text',
			inputName: 'login',
			inputValue: 'ivanivanov',
			autocomplete: 'username',
			inputStatus: ''
									}),
		password: Field({
			labelName: 'password',
			labelContent: 'Password',
			inputType: 'password',
			inputName: 'password',
			inputValue: 'random_pass',
			autocomplete: 'current_password',
			inputStatus: ''
									}),
		signInLink: Link({
			to: '/chatlist',
			text: 'Sign In',
			class: 'btn-signin'
									}),
		signUpLink: Link({
			to: '/registration',
			class: 'signup-link',
			text: 'Don\'t have an account?'
									})
		
	});
}
