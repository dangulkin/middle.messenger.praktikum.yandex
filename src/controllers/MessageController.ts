import WSTransport from '../utils/Transport/WSTransport';
import { WSEvents } from '../utils/Transport/constants';
import store from '../core/Store.ts'
import { IMessageData } from '../api/interfaces.ts';

class MessageController {
	private socketMap: Map<number, WSTransport> = new Map();
	public userId: number;
	private token:string;

	async connect(chatId: number, token: string){
		this.token = token;
		this.userId = store.getState().user?.id as number;
		const url = `/chats/${this.userId}/${chatId}/${this.token}`;
		const socket = new WSTransport(url);

		this.socketMap.set(chatId, socket);
		console.log('connecting...', chatId);
		this._addListeners(chatId, socket);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		await socket.connect().then(_response => {
			console.log('connected!');
			this.updateFeed(chatId);
		});
	}

	private _addListeners(chatId:number, socket:WSTransport){
		socket.on(WSEvents.OPEN, this.onOpen.bind(this));
		socket.on(WSEvents.ERROR, this.onError);
		socket.on(WSEvents.MESSAGE, (data:IMessageData) => this.onMessage(chatId, data));
		socket.on(WSEvents.CLOSE, this.onClose);
	}

	onOpen(){
		console.log('open');
	}

	onError(){

	}

	onMessage(chatId:number, data: IMessageData) {
		
    const messagesState = store.getState().messages;
    const feed = (messagesState && messagesState[chatId]) || [];

    const messages = Array.isArray(data) ? data.reverse() : [data];
		console.log(messages);
    store.set(`messages.${chatId}`, [...(feed as IMessageData[]), ...(messages as IMessageData[])]);
	}

	onClose(){

	}

	send(chatId:number, message:string){
		const socket = this.socketMap.get(chatId);
		socket?.send({content: message, type:'message'});
	}

	updateFeed(chatId: number) {
    const socket = this.socketMap.get(chatId);

    if (!socket?.readyState) {
      throw new Error(`Chat ${chatId} is not connected`)
    }

    socket.send({ type: 'get old', content: '0' })
  }

	getMessages(){
		
	}
}

const controller = new MessageController();
export default controller;
