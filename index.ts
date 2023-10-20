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

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('main')!;

	const route = window.location.pathname;
	let component;
	switch(route){
		case '/': 
			component = new Main();
			break;
		
		case '/authorization': 
			component = new Main();
			break;

		case '/registration':
			component = new Registration();
			break;

		case '/chats':
			component = new Chats();
			break;

		case '/profile':
			component = new Profile();
			break;

		case '/Page404':
			component = new Page404();
			break;

		case '/Page500':
			component = new Page500();
			break;

		default:
			component = new Page404();

	}
	root?.append(component.element!);
	component.dispatchComponentDidMount();

});
