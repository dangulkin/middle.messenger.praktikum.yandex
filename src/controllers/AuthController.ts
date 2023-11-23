import { AuthAPI } from '../api/AuthAPI';
import { ISignInData, ISignUpData} from '../api/interfaces';
import Router, { Routes } from '../core/Router';
import store from '../core/Store';

class AuthController {
  private api = new AuthAPI();

  async signin(data: ISignInData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      Router.go(Routes.Messenger);
    } catch (error) {
      console.log(error);
    }
  }

  async signup(data: ISignUpData) {
    try {
      await this.api.signup(data);

      Router.go(Routes.Messenger);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      store.set('user', undefined);

      Router.go(Routes.Index);

    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser() {
		// eslint-disable-next-line no-useless-catch
		try {
      const user = await this.api.getUser();

      store.set('user', user);

    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
