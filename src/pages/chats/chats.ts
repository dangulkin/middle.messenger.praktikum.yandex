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
import MessageController from '../../controllers/MessageController';
import { IChatData, State } from '../../api/interfaces';
import { withStore } from '../../core/Store';

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
					focus: () => {

					}
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

			this.children.chat = new Chat({});
			(this.children.chat.children.tooltip as Block).setProps({
				events:{
					click: (e:Event) => {
						switch((e.target as HTMLElement).className){
							case 'add-user':
								console.log('Add user');
								(this.children.popupUser as Block).show();
								break;
							case 'delete-user':
								console.log('Delete user');
								(this.children.popupDeleteUser as Block).show();
								break;
						}
					}
				}
			});

			this.children.createChat = new Button({
				label: 'Create new chat',
				events: {
					click: () => {
						const popup = (this.children.popupChat as Block);
						popup.show();
					}
				}
			});

			this.children.popupChat = new Popup({
				label: 'Create new chat',

				field:{
					label: {
						text: 'Name',
					},
					input: {
						type: 'text',
						id: 'chatname',
						placeholder: 'Enter chat name',
						pattern: ValidationRules.login,
						required: true,
					}
				},

				button:{
					label: 'Save',
					events: {
						click: () => {
							const popup = (this.children.popupChat as Block);
							ChatController.create((popup.children.field as Field).input.getValue());
							popup.hide();
						},
					}
				},
			});

			this.children.popupUser = new Popup({
				label: 'Add new user',

				field:{
					label: {
						text: 'Login',
					},
					input: {
						type: 'text',
						id: 'username',
						placeholder: 'Enter user login',
						pattern: ValidationRules.login,
						required: true,
					}
				},

				button:{
					label: 'Add',
					events: {
						click: async () => {
							const popup = (this.children.popupUser as Block);
							popup.hide();
							const chatId = ChatController.currentChat?.id as number;
							console.log(chatId);
							await ChatController.addUser(chatId, (popup.children.field as Field).input.getValue());
						},
					}
				},
			});

			this.children.popupDeleteUser = new Popup({
				label: 'Delete user',

				field:{
					label: {
						text: 'Login',
					},
					input: {
						type: 'text',
						id: 'username-delete',
						placeholder: 'Enter user login',
						pattern: ValidationRules.login,
						required: true,
					}
				},

				button:{
					label: 'Delete',
					events: {
						click: async () => {
							const popup = (this.children.popupDeleteUser as Block);
							popup.hide();
							const chatId = ChatController.currentChat?.id as number;
							console.log(chatId);
							await ChatController.deleteUser(chatId, (popup.children.field as Field).input.getValue());
						},
					}
				},
			});

			this.children.sendButton = new Button({
				class: 'message-send-button',
				events: {
					click: () => {
						const input = this.children.messageInput as Input
						MessageController.send(ChatController.currentChat?.id as number, input.getValue());
					}
				}
			});

			ChatController.fetchChats();
	}

	protected componentDidMount(): void {
		console.log('CHATs MOUNT');
	}

	protected componentDidUpdate() {
		if(!ChatController.currentChat && this.props.chats.list.length)
			ChatController.setCurrentChat(this.props.chats.list[0].id);

		(this.children.chat as Block).setProps({
			chat: ChatController.currentChat,
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
	// console.log(state)
  return {
		user: state.user,
		chats: state.chats
	};
}

export const Chats = withStore(mapStateToProps)(BaseChats);
