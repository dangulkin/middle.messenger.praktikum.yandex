import './Settings.css';
import { tmpl } from './Settings.tmpl';
import { Field } from '../../components/Field/field';
import { Link } from '../../components/Link/link';
import { Avatar } from '../../components/Avatar/avatar';
import Block from '../../core/Block';
import { Button } from '../../components/Button/button';
import { ValidationRules } from '../../utils/validationrules';
import AuthController from '../../controllers/AuthController';
import AvatarController from '../../controllers/AvatarController';
import { withStore, State } from '../../core/Store';
import user from '../../api/UserAPI';
import { IUserData } from '../../api/interfaces';
import { RESOURCES } from '../../utils/Transport/constants';
import Router from '../../core/Router';

class BaseSettings extends Block {

  constructor() {
    super('div.profile', {});
  }

  init() {
		this.children.avatar = new Avatar({
			width: '100%',
			height: '100%',
		});

		this.children.changeAvatar = new Field({
			label: {
				name: 'avatar',
				text: 'Выберите\nизображение',
				for: 'avatar',
			},
			input: {
				name: 'avatar',
				id: 'avatar',
				type: 'file',
				events: {
					change: () => {
						const input = (this.children.changeAvatar as Field).input.getContent() as HTMLInputElement;
						if(input.files){
							const avatar = input.files[0] as Blob;
							const formData = new FormData();
							formData.append('avatar', avatar);

							AvatarController.setAvatar(formData);
						}
					},
				},
			},
		});

    this.children.goBack = new Link({
			to:'#',
      events: {
        click: (e) => {
					e.preventDefault();
					Router.go('/profile');
        },
      },
    });

    this.children.email = new Field({
      label: {
        name: 'email',
        text: 'E-mail',
      },
      input: {
        name: 'email',
        type: 'text',
        value: 'random@email.com',
        autocomplete: 'email',
        pattern: ValidationRules.email,
      },
      error:
        'латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания',
    });

    this.children.login = new Field({
      label: {
        name: 'login',
        text: 'Login',
      },
      input: {
        name: 'login',
        type: 'text',
        value: 'ivanivan',
        autocomplete: 'username',
        pattern: ValidationRules.login,
      },
      error: 'от 3 до 20 символов, латиница, может содержать цифры',
    });

    this.children.firstName = new Field({
      label: {
        name: 'first_name',
        text: 'First name',
      },
      input: {
        name: 'first_name',
        type: 'text',
        value: 'Ivan',
        autocomplete: 'given-name',
        pattern: ValidationRules.name,
      },
      error: 'Только буквы, первая должна быть заглавной',
    });

    this.children.secondName = new Field({
      label: {
        name: 'second_name',
        text: 'Family name',
      },
      input: {
        name: 'second_name',
        type: 'text',
        value: 'Ivanov',
        autocomplete: 'surname',
        pattern: ValidationRules.name,
      },
      error: 'Только буквы, первая должна быть заглавной',
    });

    this.children.displayName = new Field({
      label: {
        name: 'display_name',
        text: 'Display name',
      },
      input: {
        name: 'display_name',
        type: 'text',
        value: '',
				
        autocomplete: 'nickname',
        pattern: ValidationRules.name,
      },
      error: 'Только буквы, первая должна быть заглавной',
    });

    this.children.phone = new Field({
      label: {
        name: 'phone',
        text: 'Phone',
      },
      input: {
        name: 'phone',
        type: 'tel',
        value: '71234567890',
				
        autocomplete: 'phone',
        pattern: ValidationRules.phone,
      },
      error: 'от 10 до 15 цифр',
    });

    this.children.saveButton = new Button({
      name: 'submit',
      type: 'submit',
      label: 'Save changes',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.logFormData();

					if(this.formData && this.formIsValid){
						const data = Object.fromEntries(this.formData.entries());
						user
						.update(data as unknown as IUserData)
						.then(()=>{
							if (this.formIsValid) {
								(this.children.saveButton as Button).update();
								(this.children.saveButton as Button).setProps({ label: 'Saved!' });

								setTimeout(function(){Router.go('/profile')}, 1000);
							}
						});
					}
        },
      },
    });
  }

	protected componentDidMount(): void {
		AuthController.fetchUser();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected componentDidUpdate() {
		console.log('\n\n\nComponent did update with new props:\n', {...this.props});
		(this.children.avatar as Avatar).setProps({src:RESOURCES + this.props.avatar});
		(this.children.email as Field).input.setProps({value:this.props.email});
		(this.children.login as Field).input.setProps({value:this.props.login});
		(this.children.firstName as Field).input.setProps({value:this.props.first_name});
		(this.children.secondName as Field).input.setProps({value:this.props.second_name});
		(this.children.displayName as Field).input.setProps({value:this.props.display_name || ''});
		(this.children.phone as Field).input.setProps({value:this.props.phone});

		return true;
	}

  render() {
    return this.compile(tmpl, this.props);
  }
	
}

function mapStateToProps(state: State) {
	// console.log(state.user);
  return { ...state.user };
}

export const Settings = withStore(mapStateToProps)(BaseSettings);
