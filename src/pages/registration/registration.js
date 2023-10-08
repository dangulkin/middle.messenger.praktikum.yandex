import './registration.css';
import Handlebars from 'handlebars';
import { tmpl } from './registration.tmpl';
import { Link } from '../../components/Link/link';

export const Registration = () => {
	return Handlebars.compile(tmpl)({
		signUpLink: Link({
			to: '/authorization',
			text: 'Sign up',
			class: 'btn-signup'
		}),
		loginLink: Link({
			to: '/authorization',
			text: 'Login',
			class: 'signin-link'
		})
	});
}
