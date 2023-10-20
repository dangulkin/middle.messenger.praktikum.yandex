import { Main } from './src/pages/authorization/authorization.ts';
import { Registration } from './src/pages/registration/registration.ts';
import { Chats } from './src/pages/chats/chats.ts'; 
import { Profile } from './src/pages/profile/profile.ts'; 
import { Page404 } from './src/pages/page404/page404.ts'; 
import { Page500 } from './src/pages/page500/page500.ts'; 

const ROUTES: Record<string,any> = {
	'/' : Main,
	'/authorization' :  Main,
	'/registration' : Registration,
	'/chats' : Chats,
	'/profile' : Profile,
	'/page404' : Page404,
	'/page500' : Page500
}

type userdata = {
	name: string,
	second_name: string,
	display_name: string,
	nickname: string,
	login: string,
	email: string,
	password: string,
	new_password: string
}

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('main')!;
	
	const component = new ROUTES[window.location.pathname]() || new Page404();
	root?.append(component.element!);
	component.dispatchComponentDidMount();

});
