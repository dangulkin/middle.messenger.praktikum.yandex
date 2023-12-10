import { API } from './api.ts';
import { IUserData, IPasswordData} from './interfaces.ts';

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  uploadAvatar(data: FormData){
    return this.http.put('/profile/avatar', data);
  }

	update(data: IUserData) {
		return this.http.put('/profile', data);
	}
	
	changePassword(data: IPasswordData) {
		return this.http.put('/password', data);
	}

	search(login: string):Promise<IUserData[]> {
    return this.http.post('/search', { login })
  }
}

const user = new UserAPI();
export default user;
