import { Main } from './src/pages/authorization/authorization.js';
import { Registration } from './src/pages/registration/registration.js';
import { Chatlist } from './src/pages/chatlist/chatlist.js'; 
import { Profile } from './src/pages/profile/profile.js'; 
import { Page404 } from './src/pages/page404/page404.js'; 
import { Page500 } from './src/pages/page500/page500.js'; 

const ROUTES = {
	'/' : Main,
	'/authorization' : Main,
	'/registration' : Registration,
	'/chatlist' : Chatlist,
	'/profile' : Profile,
	'/page404' : Page404,
	'/page500' : Page500
}

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('main');
	
	if(root) {
		const content = ROUTES[window.location.pathname] || Page404;
		root.innerHTML = content({});
	}
});
