import Block from '../../core/Block';
import tmpl from './chatItem.tmpl';
import { IChatData } from '../../api/interfaces';
import ChatController from '../../controllers/ChatController';
import dateToTime from '../../utils/dateToTime';

export class ChatItem extends Block {
  constructor(props: IChatData) {
    super('div.chat-item', props);
  }

	init(){
		if(this.props.id === ChatController.currentChat?.id){
			this.props.class = 'current';
			this.className = this.props.class;
		}

		this.props.time = dateToTime(this.props.last_message.time);
		console.log(this.props);
		this.props.events = {
			click: () => {
				ChatController.setCurrentChat(this.props.id);
			}
		}
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
