import Block from '../../core/Block';
import tmpl from './chat.tmpl';
import { Button } from '../Button/button';
import { Message } from '../Message/message';
import { IChatData } from '../../api/interfaces';
import ChatController from '../../controllers/ChatController';
import { Feed } from '../Feed/feed';
import { Tooltip } from '../Tooltip/tooltip';

interface ChatProps {
	chat?: IChatData,
	messages?: Message[]
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('div.chat', props);
  }

	init(){
		this.children.tooltip = new Tooltip({
			buttons: [{
			label:'Add user',
			class: 'add-user',
			events: {
				click: () => {
					const currentChatId = ChatController.currentChat?.id
          if (!currentChatId) return

          try {
            // await ChatController.addUsers(currentChatId, )
          } catch (e) {
            console.error(e)
          }
				}
			}
		},
		{
			label:'Delete user',
			class: 'delete-user',
			events: {
				click: () => {
					
				}
			}
		},
		{
			label: 'Delete chat',
			class: 'delete-chat',
			events: {
				click: () => {
					if(ChatController.chats?.list.length){
					console.log('delete chat');
					ChatController.deleteChat(ChatController.currentChat?.id as number)
				}
				}
			}
		}]
		});
		this.children.tooltip.show();

		this.children.menu = new Button({
			class: 'chat-menu',
			events: {
				click: () => {
					// this.children.tooltip.show();
				}
			}
		});

		this.children.feed = new Feed({});

	}

	protected componentDidMount(): void {
		console.log('CHAT MOUNT');
	}

	protected componentDidUpdate(): boolean {
		console.log('CHAT UPDATE');
		return true;
	}
	
  render() {
    return this.compile(tmpl, this.props);
  }
}
