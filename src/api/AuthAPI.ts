import { API } from './api';
import { ISignInData, ISignUpData} from './interfaces';

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
