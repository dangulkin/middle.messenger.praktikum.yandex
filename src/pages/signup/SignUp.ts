import "./SignUp.css";
import { tmpl } from "./SignUp.tmpl.ts";
import { Field } from "../../components/Field/field.ts";
import { Link } from "../../components/Link/link.ts";
import Block from "../../core/Block.ts";
import { ValidationRules } from "../../utils/validationrules.ts";
import { Button } from "../../components/Button/button.ts";
import AuthController from "../../controllers/AuthController.ts";
import { ISignUpData } from "../../api/interfaces.ts";

export class SignUp extends Block {
  constructor() {
    super("div.registration", {});
  }

  get passEqual() {
    const formData = new FormData(this.form());
    const match = formData.get("password") === formData.get("password_repeat");
    return match;
  }

  private _checkForm() {
    if (!this.passEqual) {
      (this.children.repeatPassword as Field).setCustomValidity(
        "Пароли не совпадают ¯\\_(ツ)_/¯",
      );
      //(this.children.repeatPassword as Block).setProps({error: 'Пароли не совпадают ¯\\_(ツ)_/¯'});
    } else {
      (this.children.repeatPassword as Field).setCustomValidity("");
    }
    console.log(this.formIsValid);
    if (this.formIsValid) {
      (this.children.submit as Button).update("on");
    }
  }

  init() {
    this.children.email = new Field({
      label: {
        name: "email",
        text: "E-mail",
      },
      input: {
        name: "email",
        type: "text",
        placeholder: "random@example.com",
        required: true,
        autocomplete: "email",
        pattern: ValidationRules.email,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error:
        "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания",
    });

    this.children.login = new Field({
      label: {
        name: "login",
        text: "Login",
      },
      input: {
        name: "login",
        type: "text",
        placeholder: "Login",
        required: true,
        autocomplete: "username",
        pattern: ValidationRules.login,
        events: {
          blur: () => {
            // this._checkForm();
          },
        },
      },
      error: "от 3 до 20 символов, латиница, может содержать цифры",
    });

    this.children.firstName = new Field({
      label: {
        name: "first_name",
        text: "First name",
      },
      input: {
        name: "first_name",
        type: "text",
        placeholder: "Name",
        required: true,
        autocomplete: "name",
        pattern: ValidationRules.name,
        events: {
          blur: () => {
            // this._checkForm();
          },
        },
      },
      error: "Только буквы, первая должна быть заглавной",
    });

    this.children.secondName = new Field({
      label: {
        name: "second_name",
        text: "Family name",
      },
      input: {
        name: "second_name",
        type: "text",
        placeholder: "Second name",
        autocomplete: "surname",
        pattern: ValidationRules.name,
        events: {
          blur: () => {
            // this._checkForm();
          },
        },
      },
      error: "Только буквы, первая должна быть заглавной",
    });

    this.children.phone = new Field({
      label: {
        name: "second_name",
        text: "Phone",
      },
      input: {
        name: "phone",
        type: "tel",
        placeholder: "71234567890",
        autocomplete: "phone",
        pattern: ValidationRules.phone,
        events: {
          blur: () => {},
        },
      },
      error: "от 10 до 15 символов",
    });

    this.children.password = new Field({
      label: {
        name: "password",
        text: "Password",
      },
      input: {
        name: "password",
        type: "password",
        placeholder: "Введите пароль",
        required: true,
        autocomplete: "current_password",
        pattern: ValidationRules.password,
        events: {
          blur: () => {
            //this._checkForm();
          },
        },
      },
      error:
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    });

    this.children.repeatPassword = new Field({
      label: {
        name: "password_repeat",
        text: "Repeat password",
      },
      input: {
        name: "password_repeat",
        type: "text",
        placeholder: "Повторите пароль",
        required: true,
        autocomplete: "new_password",
        pattern: ValidationRules.password,
        events: {
          blur: () => {
            // this._checkForm();
          },
        },
      },
      error:
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    });

    this.children.loginLink = new Link({
      to: "/authorization",
      text: "Sign In",
      class: "signin-link",
      events: {
        click: () => {},
      },
    });

    this.children.submit = new Button({
      type: "submit",
      label: "Sign Up",
      class: "btn-signup",
      events: {
        click: (e: Event) => {
          e.preventDefault();

          if (this.formData) {
            const data = Object.fromEntries(this.formData.entries());
            AuthController.signup(data as unknown as ISignUpData);
          }

          this.logFormData();
          // window.location.href='/chats';
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
