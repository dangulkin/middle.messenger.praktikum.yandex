import './chats.css';
import Block from '../../utils/Block';
import tmpl from './chats.tmpl';
import { Link } from '../../components/Link/link';
import { Input } from '../../components/Input/input';
import { Chat } from '../../components/Chat/chat';
import { ValidationRules } from '../../utils/mydash/validationrules';

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

			this.children.chatlist = this.props.chats.map((chat:unknown) => {
					return new Chat(chat)
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
			
			this.children.message = new Input({
				name: 'message',
				type: 'text',
				value: 'Message',
				pattern: ValidationRules.message,
				events: {
					focus: () => { 
						(this.children.message as Block).setProps({value: ''});	
					},
					blur: () => {
						console.log('message is valid?',(this.children.message as Input).isValid);
					}
				}
			});
	}

render() {
return this.compile(tmpl, this.props);
}
}
