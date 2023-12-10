import "./profile.css";
import { tmpl } from "./profile.tmpl.ts";
import { Field } from "../../components/Field/field.ts";
import { Link } from "../../components/Link/link.ts";
import { Avatar } from "../../components/Avatar/avatar.ts";
import Block from "../../core/Block.ts";
import { Button } from "../../components/Button/button.ts";
import { ValidationRules } from "../../utils/validationrules.ts";
import AuthController from "../../controllers/AuthController.ts";
import AvatarController from "../../controllers/AvatarController.ts";
import { withStore } from "../../core/Store.ts";
import { State } from "../../api/interfaces.ts";
import { RESOURCES } from "../../utils/Transport/constants.ts";
import Router, { Routes } from "../../core/Router.ts";

class BaseProfile extends Block {
  constructor() {
    super("div.profile", {});
  }

  private _checkForm() {
    const submit = this.children.saveButton as Button;
    if (this.formIsValid) {
      submit.update("on");
    }
  }

  init() {
    this.children.avatar = new Avatar({
      width: "100%",
      height: "100%",
    });

    this.children.changeAvatar = new Field({
      label: {
        name: "avatar",
        text: "Выберите\nизображение",
        for: "avatar",
      },
      input: {
        name: "avatar",
        id: "avatar",
        type: "file",
        events: {
          change: () => {
            const input = (
              this.children.changeAvatar as Field
            ).input.getContent() as HTMLInputElement;
            if (input.files) {
              const avatar = input.files[0] as Blob;
              const formData = new FormData();
              formData.append("avatar", avatar);

              AvatarController.setAvatar(formData);
            }
          },
        },
      },
    });

    this.children.goBack = new Link({
      text: "",
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go(Routes.Messenger);
        },
      },
    });

    this.children.email = new Field({
      label: {
        name: "email",
        text: "E-mail",
      },
      input: {
        name: "email",
        type: "text",
        value: "",
        autocomplete: "email",
        disabled: true,
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
        value: "",
        disabled: true,
        autocomplete: "username",
        pattern: ValidationRules.login,
        events: {
          focus: () => {},
          blur: () => {
            this._checkForm();
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
        value: "",
        autocomplete: "given-name",
        disabled: true,
        pattern: ValidationRules.name,
        events: {
          blur: () => {
            this._checkForm();
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
        value: "",
        autocomplete: "surname",
        disabled: true,
        pattern: ValidationRules.name,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error: "Только буквы, первая должна быть заглавной",
    });

    this.children.displayName = new Field({
      label: {
        name: "display_name",
        text: "Display name",
      },
      input: {
        name: "display_name",
        type: "text",
        value: "",
        disabled: true,
        autocomplete: "nickname",
        pattern: ValidationRules.name,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error: "Только буквы, первая должна быть заглавной",
    });

    this.children.phone = new Field({
      label: {
        name: "phone",
        text: "Phone",
      },
      input: {
        name: "phone",
        type: "tel",
        value: "",
        autocomplete: "phone",
        pattern: ValidationRules.phone,
        events: {
          blur: () => {
            this._checkForm();
          },
        },
      },
      error: "от 10 до 15 цифр",
    });

    this.children.settingsLink = new Link({
      text: "Edit Profile",
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go(Routes.EditProfile);
        },
      },
    });

    this.children.changePasswordLink = new Link({
      text: "Change password",
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go(Routes.Password);
        },
      },
    });

    this.children.logoutLink = new Link({
      text: "Log out",
      events: {
        click: () => {
          AuthController.logout();
          Router.go(Routes.Index);
        },
      },
    });

    this.children.saveButton = new Button({
      name: "submit",
      type: "submit",
      label: "Save changes",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.logFormData();
          (this.children.saveButton as Button).setProps({ label: "Сохранить" });
        },
      },
    });
  }

  protected componentDidMount(): void {
    // console.log('Profile fetch');
    AuthController.fetchUser();
  }

  protected componentDidUpdate() {
    // console.log('\n\n\nComponent did update with new props:\n', {...this.props});
    // console.log(RESOURCES + this.props.avatar);
    (this.children.avatar as Avatar).setProps({
      src: RESOURCES + this.props.avatar,
    });
    (this.children.email as Field).input.setProps({ value: this.props.email });
    (this.children.login as Field).input.setProps({ value: this.props.login });
    (this.children.firstName as Field).input.setProps({
      value: this.props.first_name,
    });
    (this.children.secondName as Field).input.setProps({
      value: this.props.second_name,
    });
    (this.children.displayName as Field).input.setProps({
      value: this.props.display_name || "",
    });
    (this.children.phone as Field).input.setProps({ value: this.props.phone });

    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

function mapStateToProps(state: State) {
  console.log({ ...state.user });
  return { ...state.user };
}

export const Profile = withStore(mapStateToProps)(BaseProfile);
