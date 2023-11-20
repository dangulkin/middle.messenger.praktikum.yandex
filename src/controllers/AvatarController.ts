import { UserAPI } from '../api/UserAPI';
import { IUserData } from '../api/interfaces';
import store from '../core/Store';

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
