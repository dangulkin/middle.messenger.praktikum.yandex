import { UserAPI } from '../api/UserAPI.ts';
import { IUserData } from '../api/interfaces.ts';
import store from '../core/Store.ts';

class AvatarController {
	private api = new UserAPI();

	async setAvatar(formData: FormData){
    try {
        const data = await this.api.uploadAvatar(formData);
        store.set('user.avatar', (data as unknown as IUserData).avatar);
    } catch (error) {
        console.error('Error uploading avatar:', error.message);
        throw error;
    }
	}
}

export default new AvatarController();
