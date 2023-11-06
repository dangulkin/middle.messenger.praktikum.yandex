import './SignIn.css';
import {tmpl} from './SignIn.tmpl';
import {Field} from '../../components/Field/field';
import {Link} from '../../components/Link/link';
// import { Input } from 'src/components/Input/input';
import { Button } from '../../components/Button/button';
import Block from '../../core/Block';
import {ValidationRules} from '../../utils/validationrules';
import AuthController from '../../controllers/AuthController';
import { ISignInData } from '../../api/AuthAPI';


export class SignIn extends Block {
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
				placeholder: 'Enter login',
				required: true,
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
				placeholder: 'Enter password',
				required: true,
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
				events: {
					click: (e:Event) => {
						e.preventDefault();

						// const values = Object
						// .values(this.children)
						// .filter(child => child instanceof Field)
						// .map((child) => ([((child as Field).children.input as Input).getName(), ((child as Field).children.input as Input).getValue()]))

						// const data0 = Object.fromEntries(values);
						// console.log(data0);

						// const data1: ISignInData = {
						// 	login: this.formData?.get('login') as string,
						// 	password: this.formData?.get('password') as string,
						// };

						// AuthController.signin(data1);

						if(this.formData){
							const data = Object.fromEntries(this.formData.entries());
							AuthController.signin(data as unknown as ISignInData);
						}else{
							console.log('No form data');
						}
						
						this.logFormData();
						//window.location.href='/chats';
					}
				}
		});

		this.children.signUpLink = new Link({
				to: '/signup',
				text: 'Sign Up',
				class: 'signup-link',
				events: {
					click: () => {
						if(this.formData){
							const data = Object.fromEntries(this.formData.entries());
							AuthController.signin(data as unknown as ISignInData);
						}else{
							console.log('No form data');
						}
						// e.preventDefault();
					}
				}
		});
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
