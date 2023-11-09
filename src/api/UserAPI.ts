import { API } from './api';

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  setAvatar(data: FormData) {
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
