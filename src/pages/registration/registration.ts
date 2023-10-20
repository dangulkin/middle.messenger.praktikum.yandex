import './registration.css';
import {tmpl} from './registration.tmpl.ts';
import {Field} from '../../components/Field/field.ts';
import {Link} from '../../components/Link/link.ts';
import Block from '../../utils/Block';
import { ValidationRules } from '../../utils/mydash/validationrules.ts';
import { Button } from '../../components/Button/button.ts';

export class Registration extends Block {
  constructor() {
    super('div.registration', {});
  }

	get passEqual(){
		const formData = new FormData(this.form());
		const match = (formData.get('password') === formData.get('password_repeat'));
		return match;
	}

	private _checkForm(){
		if(!this.passEqual){
			(this.children.repeatPassword as Field).setCustomValidity('Пароли не совпадают ¯\\_(ツ)_/¯');
			//(this.children.repeatPassword as Block).setProps({error: 'Пароли не совпадают ¯\\_(ツ)_/¯'});
		}else{
			(this.children.repeatPassword as Field).setCustomValidity('');
		}
		
		if(this.formIsValid){
			(this.children.submit as Button).updateButton('on');
		}
	}

	init() {
		this.children.email = new Field({
			label: {
				name: 'email',
				text: 'E-mail'
			},
			input: {
				name: 'email',
				type: 'text',
				value: 'random@example.com',
				autocomplete: 'email',
				required: true,
				pattern: ValidationRules.email,
				events: {
					blur: () => {
						this._checkForm();
					},
				}
			},
			error: 'латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания',
	});

		this.children.login = new Field({
				label: {
					name: 'login',
					text: 'Login'
				},
				input: {
					name: 'login',
					type: 'text',
					value: 'dangulkin',
					autocomplete: 'username',
					required: true,
					pattern: ValidationRules.login,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 3 до 20 символов, латиница, может содержать цифры',
		});
		
		this.children.firstName = new Field({
				label: {
					name: 'first_name',
					text: 'First name'
				},
				input:	{
					name: 'first_name',
					type: 'text',
					value: 'Ivan',
					autocomplete: 'name',
					required: true,
					pattern: ValidationRules.name,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'Только буквы, первая должна быть заглавной',
		});
		
		this.children.secondName = new Field({
				label: {
					name: 'second_name',
					text: 'Family name'
				},
				input: {
					name: 'second_name',
					type: 'text',
					value: 'Ivanov',
					autocomplete: 'surname',
					pattern: ValidationRules.name,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'Только буквы, первая должна быть заглавной',
		});
		
		this.children.phone = new Field({
				label: {
					name: 'second_name',
					text: 'Phone'
				},
				input: {
					name: 'phone',
					type: 'tel',
					value: '71234567890',
					autocomplete: 'phone',
					required: true,
					pattern: ValidationRules.phone,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 10 до 15 символов',
		});
		
		this.children.password = new Field({
				label:{
					name: 'password',
					text: 'Password'
				},
				input: {
					name: 'password',
					type: 'text',
					value: 'random_pass4R',
					autocomplete: 'current_password',
					pattern: ValidationRules.password,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		});
		
		this.children.repeatPassword = new Field({
				label: {
					name: 'password_repeat',
					text: 'Repeat password'
				},
				input: {
					name: 'password_repeat',
					type: 'text',
					value: 'random_pass4R',
					autocomplete: 'new_password',
					pattern: ValidationRules.password,
					events: {
						blur: () => {
							
							this._checkForm();
						},
					}
				},
				error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		});

		this.children.loginLink = new Link({
				to: '/authorization',
				text: 'Sign In',
				class: 'signin-link',
				events: {
					click: () => {
					}
				}
		});

		this.children.submit = new Button({
			type: 'submit',
			label: 'Sign Up',
			class: 'btn-signup',
			disabled: true,
			events: {
				click: (e:Event) => {
					e.preventDefault();
					this.logFormData();
					window.location.href='/chats';
				}
			}
	});
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}