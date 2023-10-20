import './profile.css';
import {tmpl} from './profile.tmpl';
import { Field } from '../../components/Field/field';
import {Link} from '../../components/Link/link';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/button';
import { ValidationRules } from '../../utils/mydash/validationrules';

export class Profile extends Block {
  constructor() {
    super('div.profile', {});
  }

	get passEqual(){
		const formData = new FormData(this.form());
		const match = (formData.get('new_password') === formData.get('repeat_new_password'));
		return match;
	}

	private _checkForm(){
		if(!this.passEqual){
			(this.children.repeatNewPassword as Field).setCustomValidity('Пароли не совпадают ¯\\_(ツ)_/¯');
			//(this.children.repeatPassword as Block).setProps({error: 'Пароли не совпадают ¯\\_(ツ)_/¯'});
		}else{
			(this.children.repeatNewPassword as Field).setCustomValidity('');
		}
		
		if(this.formIsValid){
			(this.children.saveButton as Button).updateButton('on');
		}
	}

	init() {
		this.children.goBack = new Link({
			to: '/',
			text: '',
			events: {
				click: () => { console.log('goBack click') }
			}
		});

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
			input:	{
				name: 'login',
				type: 'text',
				value: 'ivanivanov',
				autocomplete: 'username',
				pattern: ValidationRules.login,
				events: {
					focus: () => {},
					blur: () => {
						this._checkForm();
					},
				},
			},
			error: 'от 3 до 20 символов, латиница, может содержать цифры'
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
				autocomplete: 'given-name',
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
		
		this.children.displayName = new Field({
			label: {
				name: 'display_name',
				text: 'Display name'
			},
			input: {
				name: 'display_name',
				type: 'text',
				value: 'Vanya',
				autocomplete: 'nickname',
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
					name: 'phone',
					text: 'Phone'
				},
				input: {
					name: 'phone',
					type: 'tel',
					value: '71234567890',
					autocomplete: 'phone',
					pattern: ValidationRules.phone,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 10 до 15 цифер',
		});
		
		this.children.oldPassword = new Field({
				label: {
					name: 'password',
					text: 'Password',
				},
				input: {
					name: 'password',
					type: 'text',
					value: 'random_pass',
					autocomplete: 'current-password',
					pattern: ValidationRules.password,
					events: {
						blur: () => {
							this._checkForm();
						},
					},
				},
				error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		});
		
		this.children.newPassword = new Field({
				label: {
					name: 'new_password',
					text: 'New password',
				},
				input: {
					name: 'new_password',
					type: 'text',
					value: 'random_pass',
					autocomplete: 'new-password',
					pattern: ValidationRules.password,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		});

		this.children.repeatNewPassword = new Field({
				label: {
					name: 'repeat_new_password',
					text: 'Repeat password'
				},
				input: {
					name: 'repeat_new_password',
					type: 'text',
					value: 'random_pass',
					autocomplete: 'new-password',
					pattern: ValidationRules.password,
					events: {
						blur: () => {
							this._checkForm();
						},
					}
				},
				error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		});

		this.children.manageAccountLink = new Link({
				to: 'page404',
				text: 'Manage details',
				events: {
					click: () => { console.log('manage account click') }
				}
		});

		this.children.changePasswordLink = new Link({
				to: 'page500',
				text: 'Change password',
				events: {
					click: () => { console.log('change password click') }
				}
		});
		
		this.children.logoutLink = new Link({
				to: '/',
				text: 'Log out',
				events: {
					click: () => { console.log('logout click') }
				}
		});

		this.children.saveButton = new Button({
			name: 'submit',
			type: 'submit',
			label: 'Save changes',
			disabled: true,
			events: {
				click: (e:Event) => {
					e.preventDefault();
					this.logFormData();
			 	}
			},
		});
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
