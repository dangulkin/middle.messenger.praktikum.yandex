import { ChatAPI } from '../api/ChatAPI';
import { UserAPI } from '../api/UserAPI';
import store from '../core/Store';
import MessageController from './MessageController';
import { IChatData, IUserData } from '../api/interfaces';

class ChatController {
	private api = new ChatAPI();
	private userAPI = new UserAPI();

	async create(title: string) {
    const { id } = await this.api.create(title);
		this.setCurrentChat(id);
		this.fetchChats();
  }

	async getUsers(chatId: number) {
    return await this.api.getUsers(chatId);
  }

	async fetchChats() {
		const list: IChatData[] = await (this.api.list() as Promise<IChatData[]>);
		console.log(list);
		list.forEach(async (chat) => {
      const token = await this.getToken(chat.id!)
      await MessageController.connect(chat.id!, token)
    })
		store.set('chats.list', list);
  }

	async deleteChat(id: number){
		await this.api.delete(id);
		this.fetchChats();
	}

	setCurrentChat(chatId: number){
		store.set('chats.currentChatId', chatId);
		// this.connectToChat(chatId);
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

	async getToken(chatId: number) {
    return await this.api.token(chatId)
  }

	async connectToChat(chatId: number){
		const token =  await this.getToken(chatId!);
		MessageController.connect(chatId!,token);
	}

	async addUser(chatId: number, login: string) {
		let userId;
		try{
			userId = await this.getUserId(login);
		}catch(e){
			throw new Error('User not found');
		}
		this.api.addUser(chatId, userId!)
  }

  async deleteUser(chatId: number, login: string) {
		let userId;
		try{
			userId = await this.getUserId(login);
		}catch(e){
			throw new Error('User not found');
		}
		this.api.deleteUser(chatId, userId!);
  }

	async findUser(login: string):Promise<IUserData[]>{
		return await this.userAPI.search(login);
	}

	protected async getUserId(login:string):Promise<number | undefined>{
		return (await this.findUser(login))
		.find(user => {
			user.login === login
		})?.id;
	}
}

export default new ChatController();
