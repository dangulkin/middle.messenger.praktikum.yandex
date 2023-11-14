import Block from '../../core/Block';
import tmpl from './chat.tmpl';
import { Button } from '../Button/button';
import { IChatData } from '../../api/interfaces';
import ChatController from '../../controllers/ChatController';

export class Chat extends Block {
  constructor(props: IChatData) {
    super('div.chat', props);
  }

	init(){
		this.children.menu = new Button({
			class: 'chat-menu',
			events: {
				click: () => {
					if(ChatController.chats?.list.length){
						console.log('delete');
						ChatController.deleteChat(ChatController.currentChat?.id as number)
					}
				}
			}
		});
	}
	
  render() {
    return this.compile(tmpl, this.props);
  }
}
