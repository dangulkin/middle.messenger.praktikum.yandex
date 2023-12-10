import Block from "../../core/Block.ts";
import tmpl from "./chatItem.tmpl.ts";
import { IChatData } from "../../api/interfaces.ts";
import ChatController from "../../controllers/ChatController.ts";
import dateToTime from "../../utils/dateToTime.ts";

export class ChatItem extends Block {
  constructor(props: IChatData) {
    super("div.chat-item", props);
  }

  init() {
    if (this.props.id === ChatController.currentChat?.id) {
      this.props.class = "current";
      this.className = this.props.class;
    }

    this.props.time = dateToTime(this.props.last_message?.time);
    // console.log(this.props);
    this.props.events = {
      click: async () => {
        ChatController.setCurrentChat(this.props.id);
        // this.connectToChat();
      },
    };
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
