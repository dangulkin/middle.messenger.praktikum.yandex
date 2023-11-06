import { API } from './api';

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  setAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }
}
