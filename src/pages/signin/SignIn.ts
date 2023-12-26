import "./SignIn.css";
import { tmpl } from "./SignIn.tmpl.ts";
import { Field } from "../../components/Field/field.ts";
import { Link } from "../../components/Link/link.ts";
// import { Input } from 'src/components/Input/input.ts';
import { Button } from "../../components/Button/button.ts";
import Block from "../../core/Block.ts";
import { ValidationRules } from "../../utils/validationrules.ts";
import AuthController from "../../controllers/AuthController.ts";
import { ISignInData } from "../../api/interfaces.ts";
import Router, { Routes } from "../../core/Router.ts";

export class SignIn extends Block {
  constructor() {
    super("div.authorization", {});
  }

  init() {
    this.children.login = new Field({
      label: {
        name: "login",
        text: "Login",
      },
      input: {
        name: "login",
        type: "text",
        placeholder: "Enter login",
        required: true,
        autocomplete: "username",
        pattern: ValidationRules.login,
      },
      error: "от 3 до 20 символов, латиница, может содержать цифры",
    });

    this.children.password = new Field({
      label: {
        name: "password",
        text: "Password",
      },
      input: {
        name: "password",
        type: "text",
        placeholder: "Enter password",
        required: true,
        autocomplete: "current_password",
        pattern: ValidationRules.password,
      },
      error:
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    });

    this.children.submit = new Button({
      type: "submit",
      label: "Sign In",
      class: "btn-signin",
      events: {
        click: (e: Event) => {
          e.preventDefault();

          if (this.formData) {
            const data = Object.fromEntries(this.formData.entries());
            AuthController.signin(data as unknown as ISignInData);
          } else {
            console.log("No form data");
          }

          this.logFormData();
        },
      },
    });

    this.children.signUpLink = new Link({
      text: "Sign Up",
      class: "signup-link",
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go(Routes.Register);
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
