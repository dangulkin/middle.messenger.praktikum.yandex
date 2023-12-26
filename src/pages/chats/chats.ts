import "./chats.css";
import Block from "../../core/Block.ts";
import tmpl from "./chats.tmpl.ts";
import { Link } from "../../components/Link/link.ts";
import { Input } from "../../components/Input/input.ts";
import { Field } from "../../components/Field/field.ts";
import { ChatItem } from "../../components/ChatItem/chatItem.ts";
import { ValidationRules } from "../../utils/validationrules.ts";
import { Button } from "../../components/Button/button.ts";
import { Chat } from "../../components/Chat/chat.ts";
import { Popup } from "../../components/Popup/popup.ts";
import ChatController from "../../controllers/ChatController.ts";
import MessageController from "../../controllers/MessageController.ts";
import { IChatData, State } from "../../api/interfaces.ts";
import { withStore } from "../../core/Store.ts";
import Router, { Routes } from "../../core/Router.ts";

export class BaseChats extends Block {
  constructor() {
    super("div.chat-window-wrapper", {});
  }

  init() {
    this.children.profileLink = new Link({
      class: "goto-profile",
      text: "Profile",
      icon: true,
      events: {
        click: () => {
          Router.go(Routes.Settings);
        },
      },
    });

    this.children.search = new Input({
      name: "search",
      type: "search",
      value: "Search",
      pattern: ValidationRules.message,
      events: {
        focus: () => {
          (this.children.search as Input)?.setValue("");
        },
        blur: () => {
          (this.children.search as Input)?.setValue("Search");
        },
      },
    });

    this.children.messageInput = new Input({
      name: "message",
      type: "text",
      value: "Message",
      pattern: ValidationRules.message,
      events: {
        focus: () => {
          (this.children.messageInput as Input)?.setValue("");
        },
        blur: () => {},
      },
    });

    this.children.chat = new Chat({});
    const tooltip = this.children.chat.children.tooltip as Block;
    tooltip?.setProps({
      events: {
        click: (e: Event) => {
          tooltip.toggle();
          const elem =
            (e.target as HTMLElement).className === "icon"
              ? (e.target as HTMLElement).parentElement
              : (e.target as HTMLElement);

          switch (elem?.className) {
            case "add-user":
              (this.children.popupUser as Block).show();
              break;
            case "delete-user":
              (this.children.popupDeleteUser as Block).show();
              break;
            case "add-avatar":
              (this.children.popupSetChatAvatar as Block).show();
              break;
          }
        },
      },
    });

    this.props.events = {
      click: (e: Event) => {
        const elem =
          (e.target as HTMLElement).className === "icon"
            ? (e.target as HTMLElement).parentElement
            : (e.target as HTMLElement);
        if (elem?.className !== "chat-menu" && tooltip.isVisible)
          tooltip.hide();
      },
    };

    this.children.createChat = new Button({
      label: "Create new chat",
      events: {
        click: () => {
          const popup = this.children.popupChat as Block;
          popup.show();
        },
      },
    });

    this.children.popupChat = new Popup({
      label: "Create new chat",

      field: {
        label: {
          text: "Name",
        },
        input: {
          type: "text",
          id: "chatname",
          placeholder: "Enter chat name",
          pattern: ValidationRules.login,
          required: true,
        },
      },

      button: {
        label: "Save",
        events: {
          click: () => {
            const popup = this.children.popupChat as Block;
            ChatController.create(
              (popup.children.field as Field).input.getValue(),
            );
            popup.hide();
          },
        },
      },
    });

    this.children.popupUser = new Popup({
      label: "Add new user",

      field: {
        label: {
          text: "Login",
        },
        input: {
          type: "text",
          id: "username",
          placeholder: "Enter user login",
          pattern: ValidationRules.login,
          required: true,
        },
      },

      button: {
        label: "Add",
        events: {
          click: async () => {
            const popup = this.children.popupUser as Block;
            popup.hide();
            const chatId = ChatController.currentChat?.id as number;
            await ChatController.addUser(
              chatId,
              (popup.children.field as Field).input.getValue(),
            );
          },
        },
      },
    });

    this.children.popupDeleteUser = new Popup({
      label: "Delete user",

      field: {
        label: {
          text: "Login",
        },
        input: {
          type: "text",
          id: "username-delete",
          placeholder: "Enter user login",
          pattern: ValidationRules.login,
          required: true,
        },
      },

      button: {
        label: "Delete",
        events: {
          click: async () => {
            const popup = this.children.popupDeleteUser as Block;
            popup.hide();
            const chatId = ChatController.currentChat?.id as number;
            await ChatController.deleteUser(
              chatId,
              (popup.children.field as Field).input.getValue(),
            );
          },
        },
      },
    });

    this.children.popupSetChatAvatar = new Popup({
      label: "Upload an image",
      field: {
        label: {
          text: "Choose an image",
          for: "upload-chat-avatar",
          name: "chat-avatar",
        },
        input: {
          type: "file",
          id: "upload-chat-avatar",
          events: {
            change: () => {
              const popup = this.children.popupSetChatAvatar as Block;
              const input = (
                popup.children.field as Field
              ).input.getContent() as HTMLInputElement;
              if (input.files) {
                const file = input.files[0];
                (popup.children.field as Block)?.setProps({
                  label: { text: file?.name },
                });
              }
            },
          },
        },
      },

      button: {
        label: "Upload",
        events: {
          click: async () => {
            const popup = this.children.popupSetChatAvatar as Block;
            const chatId = ChatController.currentChat?.id;

            popup.hide();
            (popup.children.field as Block)?.setProps({
              label: { text: "Choose an image" },
            });

            const input = (
              popup.children.field as Field
            ).input.getContent() as HTMLInputElement;
            if (input.files) {
              const avatar = input.files[0] as Blob;
              const formData = new FormData();
              formData.append("chatId", chatId?.toString() || "");
              formData.append("avatar", avatar);

              const newAvatar = await ChatController.setAvatar(formData);
              (this.children.chat as Block)?.setProps({
                chat: { avatar: newAvatar },
              });

              if (this.children.chatlist) {
                const index = this.props.chats.list.indexOf(
                  ChatController.currentChat,
                );
                const chat = (this.children.chatlist as Block[])[index];
                chat?.setProps({ avatar: newAvatar });
              }
            }
          },
        },
      },
    });

    this.children.sendButton = new Button({
      class: "message-send-button",
      events: {
        click: () => {
          const input = this.children.messageInput as Input;
          if (input.isValid) {
            MessageController.send(
              ChatController.currentChat?.id as number,
              input.getValue(),
            );
            input.setValue("Message");
          }
        },
      },
    });

    ChatController.fetchChats();
  }

  protected componentDidMount(): void {}

  protected componentDidUpdate() {
    if (!ChatController.currentChat && this.props.chats.list.length)
      ChatController.setCurrentChat(this.props.chats.list[0].id);

    (this.children.chat as Block).setProps({
      chat: ChatController.currentChat,
    });

    this.children.chatlist = [];
    this.children.chatlist = this.props.chats.list.map((props: IChatData) => {
      return new ChatItem(props);
    });

    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.user,
    chats: state.chats,
  };
}

export const Chats = withStore(mapStateToProps)(BaseChats);
