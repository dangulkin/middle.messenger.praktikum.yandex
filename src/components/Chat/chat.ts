import Block from "../../core/Block.ts";
import tmpl from "./chat.tmpl.ts";
import { Button } from "../Button/button.ts";
import { Message } from "../Message/message.ts";
import { IChatData } from "../../api/interfaces.ts";
import ChatController from "../../controllers/ChatController.ts";
import { Feed } from "../Feed/feed.ts";
import { Tooltip } from "../Tooltip/tooltip.ts";

interface ChatProps {
  chat?: IChatData;
  messages?: Message[];
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super("div.chat", props);
  }

  init() {
    this.children.tooltip = new Tooltip({
      buttons: [
        {
          label: "Add chat avatar",
          class: "add-avatar",
          icon: true,
        },
        {
          label: "Add user",
          class: "add-user",
          icon: true,
        },
        {
          label: "Delete user",
          class: "delete-user",
          icon: true,
        },
        {
          label: "Delete chat",
          class: "delete-chat",
          icon: true,
          events: {
            click: () => {
              if (ChatController.chats?.list.length) {
                console.log("delete chat");
                ChatController.deleteChat(
                  ChatController.currentChat?.id as number,
                );
              }
            },
          },
        },
      ],
    });

    this.children.menu = new Button({
      class: "chat-menu",
      icon: true,
      events: {
        click: () => {
          const tooltip = this.children.tooltip as Tooltip;
          tooltip.toggle();
        },
      },
    });

    this.children.feed = new Feed({});
  }

  protected componentDidMount(): void {}

  protected componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
