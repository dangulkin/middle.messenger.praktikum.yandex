import './chats.css';
import Block from '../../core/Block';
import tmpl from './chats.tmpl';
import { Link } from '../../components/Link/link';
import { Input } from '../../components/Input/input';
import { Field } from '../../components/Field/field';
import { ChatItem } from '../../components/ChatItem/chatItem';
import { ValidationRules } from '../../utils/validationrules';
import { Button } from '../../components/Button/button';
import { Chat } from '../../components/Chat/chat';
import { Popup } from '../../components/Popup/popup';
import ChatController from '../../controllers/ChatController';
import { IChatData } from '../../api/interfaces';
import { withStore, State } from '../../core/Store';

export class BaseChats extends Block {
constructor() {
		super('div.chat-window-wrapper', {});
}

 init(){
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

			this.children.chat = new Chat({});
			
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

			this.children.createChat = new Button({
				label: 'Create new chat',
				events: {
					click: () => {
						const popup = (this.children.popup as Block);
						popup.show();
					}
				}
			});

			this.children.popup = new Popup({
				label: 'Add new user',

				field:{
					label: {
						text: 'Login',
					},
					input: {
						type: 'text',
						id: 'chatname',
						placeholder: 'Enter user login',
						pattern: ValidationRules.login,
						required: true,
					}
				},

				button:{
					label: 'Add user',
					events: {
						click: () => {
							const popup = (this.children.popup as Block);
							ChatController.create((popup.children.field as Field).input.getValue());
							popup.hide();
						},
					}
				},

				events:{
					click: (e) => {
						const popup = (this.children.popup as Block);
						const target = e.target as HTMLElement;
						if(target.className === 'popup'){
							popup.hide();
						}
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
			ChatController.fetchChats();
	}

	protected componentDidMount(): void {
		// ChatController.fetchChats();
	}

	protected componentDidUpdate() {
		if(!ChatController.currentChat && this.props.chats.list.length)
			ChatController.setCurrentChat(this.props.chats.list[0].id);

		this.children.chat = new Chat({
			...ChatController.currentChat,
		});

		this.children.chatlist = [];
		this.children.chatlist = this.props.chats.list.map((props:IChatData) => {
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
		chats: state.chats
	};
}

export const Chats = withStore(mapStateToProps)(BaseChats);
