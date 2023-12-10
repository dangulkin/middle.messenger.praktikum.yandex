import { API } from './api.ts';

export class ChatAPI extends API{
	constructor() {
    super('/chats');
  }

  list() {
    return this.http.get('/');
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

  addUser(chatId: number, user: number) {
    return this.http.put(`/users`, { chatId, user })
  }

  deleteUser(chatId: number, user: number) {
    return this.http.delete(`/users`, { chatId, user })
  }

	addAvatar(data: FormData) {
		return this.http.put(`/avatar`, data)
	}

  async token(chatId: number) {
    const response = await this.http.post<{ token: string }>(
      `/token/${chatId}`
    )
    return response.token
  }
}

export default new ChatAPI()
