import { API } from './api';
import { IUserData, IPasswordData} from './interfaces';

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  uploadAvatar(data: FormData): Promise<Response> {
    return this.http.put('/profile/avatar', data);
  }

	update(data: IUserData) {
		return this.http.put('/profile', data);
	}
	
	changePassword(data: IPasswordData) {
		return this.http.put('/password', data);
	}
}

const user = new UserAPI();
export default user;
