import './chats.css';
import Block from '../../core/Block';
import tmpl from './chats.tmpl';
import { Link } from '../../components/Link/link';
import { Input } from '../../components/Input/input';
import { ChatItem } from '../../components/Chat/chat';
import { ValidationRules } from '../../utils/validationrules';
import { Button } from '../../components/Button/button';
// import { Message } from '../../components/Message/message';
import { Feed } from '../../components/Feed/feed';

type ChatProps = {
  chatname: string;
  text: string;
  unread: number;
  events: {
    click: () => void;
  };
};

export class Chats extends Block {
constructor() {
		super('div.chat-window-wrapper', {});
}

	init(){
		this.props.chats = [
			{
				chatname: 'Jack', 
				text: 'Hi!',
				unread: 1,
				events: {
					click: () => {}	
				}
			},
			{
				chatname: 'Alice', 
				text: 'Изображение',
				unread:0,
				events: {
					click: () => {}
				}
			},
			{
				chatname: 'Beou', 
				text: 'Let\'s get drunk! 🍻',
				unread:3,
				events: {
				click: () => {}
				}
			},
			{
				chatname: 'Йохан', 
				text: 'Чо кого?',
				unread:0,
			events: {
			click: () => {}
			}
			},
			{
				chatname: 'Анжела', 
				text: 'Вечером всё в силе? 😏',
				unread:0,
			events: {
			click: () => {}
			}
			},
			{
				chatname: 'Random guy from the job', 
				text: 'HB dude! I\'m so happy knowing ya! You are my best buddy ever! Love you bro 💋',
				unread:23,
			events: {
			click: () => {}
			}
			}];

			this.children.chatlist = this.props.chats.map((props:ChatProps) => {
					return new ChatItem(props)
			});

			this.children.profileLink = new Link({
				to: '/profile',
				class: 'goto-profile',
				text: 'Profile',
				events: {
					click: () => {}
				}
			});

			this.children.search = new Input({
				name: 'search',
				type: 'search',
				value: 'Search',
				pattern: ValidationRules.message,
				events: {
					focus: () => {}
				}
			});
			
			this.children.messageInput = new Input({
				name: 'message',
				type: 'text',
				pattern: ValidationRules.message,
				events: {
					blur: () => {
						console.log('message is valid?',(this.children.messageInput as Input).isValid);
					}
				}
			});

			this.children.sendButton = new Button({
				class: 'message-send-button',
				events: {
					click: () => {

					}
				}
			});

			this.children.feed = new Feed();
	}

	// private _createNewMessage (){
	// 	this.children.message = new Message({
	// 		text: (this.children.messageInput as Input).getValue(),
	// 	});
	// }

	render() {
		return this.compile(tmpl, this.props);
	}
}
