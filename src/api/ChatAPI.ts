import { API } from './api';

export class ChatAPI extends API{
	constructor() {
    super('/chats');
  }

  list() {
    return this.http.get();
  }

  create(title: string){
    return this.http.post<{ id: number }>('',{title});
  }

  delete(chatId: number) {
    return this.http.delete<{ userId:number, result: object }>('',{chatId});
  }

  getUsers(chatId: number) {
    return this.http.get(`${chatId}/users`)
  }

  addUsers(chatId: number, users: number[]) {
    return this.http.put(`/users`, { data: { chatId, users } })
  }

  deleteUsers(chatId: number, users: number[]) {
    return this.http.delete(`/users`, { data: { chatId, users } })
  }

  async token(chatId: number) {
    const response = await this.http.post<{ token: string }>(
      `/token/${chatId}`
    )
    return response.token
  }
}

export default new ChatAPI()