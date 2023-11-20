import { Profile } from './src/pages/profile/profile';
import { Settings } from './src/pages/settings/Settings';
import { ChangePassword } from './src/pages/changepassword/ChangePassword';
import { SignUp } from './src/pages/signup/SignUp';
import { SignIn } from './src/pages/signin/SignIn';
import { Chats } from './src/pages/chats/chats';
import router from './src/core/Router';
import AuthController from './src/controllers/AuthController';

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile',
  Settings = '/settings',
  ChangePassword = '/changepassword',
  Chats = '/chats'
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignIn)
    .use(Routes.Register, SignUp)
    .use(Routes.Profile, Profile)
    .use(Routes.Settings, Settings)
    .use(Routes.ChangePassword, ChangePassword)
    .use(Routes.Chats, Chats)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
		console.log('Index fetch');
    await AuthController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Chats);
    }
  } catch (e) {
    console.log(e, 'Here')
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
