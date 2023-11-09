import { API } from './api';

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signin(data: ISignInData) {
		// console.log(data);
    return this.http.post('/signin', data);
  }

  signup(data: ISignUpData) {
		// console.log(data);
    return this.http.post('/signup', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }
}
