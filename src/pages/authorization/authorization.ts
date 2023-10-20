import './authorization.css';
import {tmpl} from './authorization.tmpl.ts';
import {Field} from '../../components/Field/field.ts';
import {Link} from '../../components/Link/link.ts';
import { Button } from '../../components/Button/button.ts';
import Block from '../../utils/Block';
import {ValidationRules} from '../../utils/mydash/validationrules.ts';

export class Main extends Block {
  constructor() {
    super('div.authorization', {});
  }

	init() {
		this.children.login = new Field({
			label: {
				name: 'login',
				text: 'Login'
			},
			input:	{
				name: 'login',
				type: 'text',
				value: 'ivanivanov',
				autocomplete: 'username',
				pattern: ValidationRules.login,
				events: {
					focus: () => {},
					blur: () => {
						if(this.formIsValid)
							(this.children.submit as Button).updateButton('on');
					},
				},
			},
			error: 'от 3 до 20 символов, латиница, может содержать цифры'
		});
		
		this.children.password = new Field({
			label:{
				name: 'password',
				text: 'Password'
			},
			input: {
				name: 'password',
				type: 'text',
				value: 'pass_O_pass5',
				autocomplete: 'current_password',
				pattern: ValidationRules.password,
				events: {
					focus: () => {},
					blur: () => {
						if(this.formIsValid)
							(this.children.submit as Button).updateButton('on');
					},
				}
			},
			error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
		});

		this.children.submit = new Button({
				type: 'submit',
				label: 'Sign In',
				class: 'btn-signin',
				disabled: true,
				events: {
					click: (e:Event) => {
						e.preventDefault();
						this.logFormData();
					}
				}
		});

		this.children.signUpLink = new Link({
				to: '/registration',
				text: 'Sign Up',
				class: 'signup-link',
				events: {
					click: () => {}
				}
		});
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
