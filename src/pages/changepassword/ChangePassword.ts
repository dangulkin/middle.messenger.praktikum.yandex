import { tmpl } from './ChangePassword.tmpl.ts';
import { Field } from '../../components/Field/field.ts';
import { Link } from '../../components/Link/link.ts';
import { Avatar } from '../../components/Avatar/avatar.ts';
import Block from '../../core/Block.ts';
import { Button } from '../../components/Button/button.ts';
import { ValidationRules } from '../../utils/validationrules.ts';
import AuthController from '../../controllers/AuthController.ts';
import { withStore } from '../../core/Store.ts';
import user from '../../api/UserAPI.ts';
import { IPasswordData, State } from '../../api/interfaces.ts';
import { RESOURCES } from '../../utils/Transport/constants.ts';
import Router, { Routes } from '../../core/Router.ts';

export class BaseChangePassword extends Block {
  constructor() {
    super('div.profile', {});
  }

  get passEqual() {
    const formData = new FormData(this.form());
    const match =
      formData.get('new_password') === formData.get('repeat_new_password');
    return match;
  }

  private _checkForm() {
    if (!this.passEqual) {
      (this.children.repeatNewPassword as Field).setCustomValidity(
        'Пароли не совпадают ¯\\_(ツ)_/¯',
      );
    } else {
      (this.children.repeatNewPassword as Field).setCustomValidity('');
    }
  }

  init() {
    this.children.avatar = new Avatar({
      width: '100%',
      height: '100%',
    });

    this.children.goBack = new Link({
      to: '#',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go(Routes.Settings);
        },
      },
    });

    this.children.currentPassword = new Field({
      label: {
        name: 'password',
        text: 'Current password',
      },
      input: {
        name: 'password',
        type: 'text',
        autocomplete: 'current-password',
        pattern: ValidationRules.password,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error:
        'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.newPassword = new Field({
      label: {
        name: 'new_password',
        text: 'New password',
      },
      input: {
        name: 'new_password',
        type: 'password',
        autocomplete: 'new-password',
        pattern: ValidationRules.password,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error:
        'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.repeatNewPassword = new Field({
      label: {
        name: 'repeat_new_password',
        text: 'Repeat password',
      },
      input: {
        name: 'repeat_new_password',
        type: 'password',
        autocomplete: 'new-password',
        pattern: ValidationRules.password,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error:
        'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.manageAccountLink = new Link({
      to: 'page404',
      text: 'Manage details',
      events: {
        click: () => {
          console.log('manage account click');
        },
      },
    });

    this.children.saveButton = new Button({
      name: 'submit',
      type: 'submit',
      label: 'Save changes',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.logFormData();

          this._checkForm();

          if (this.formData && this.formIsValid && this.passEqual) {
            const data: IPasswordData = {
              oldPassword: (
                this.children.currentPassword as Field
              ).input.getValue(),
              newPassword: (
                this.children.newPassword as Field
              ).input.getValue(),
            };
            user.changePassword(data).then(() => {
              if (this.formIsValid) {
                (this.children.saveButton as Button).update();
                (this.children.saveButton as Button).setProps({
                  label: 'Saved!',
                });

                setTimeout(function () {
                  Router.go(Routes.Settings);
                }, 1000);
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

  protected componentDidUpdate() {
    console.log('\n\n\nComponent did update with new props:\n', {
      ...this.props,
    });
    (this.children.avatar as Avatar).setProps({
      src: RESOURCES + this.props.avatar,
    });
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

export const ChangePassword = withStore(mapStateToProps)(BaseChangePassword);
