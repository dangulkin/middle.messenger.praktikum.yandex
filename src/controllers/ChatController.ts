import { ChatAPI } from '../api/ChatAPI';
import store from '../core/Store';

class ChatController {
	private api = new ChatAPI();

	async create(title: string) {
    const { id } = await this.api.create(title);
		this.setCurrentChat(id);
		this.fetchChats();
  }

	async getUsers(chatId: number) {
    return await this.api.getUsers(chatId);
  }

	async fetchChats() {
		const list = await this.api.list();
		store.set('chats.list', list);
  }

	async deleteChat(id: number){
		await this.api.delete(id);
		this.fetchChats();
	}

	setCurrentChat(chatId: number){
		store.set('chats.currentChatId', chatId);
		console.log('Current ID: ', chatId);
	}

	update(){
		store.update();
	}

	get chats(){
		return store.getState().chats;
	}

	get currentChat(){
		const currentChatId = this.chats?.currentChatId;
		return this.chats?.list.find(chat => chat.id === currentChatId);
	}
}

export default new ChatController();
