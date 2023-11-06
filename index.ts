import { Profile } from './src/pages/profile/Profile';
import { SignUp } from './src/pages/signup/SignUp';
import { SignIn } from './src/pages/signin/SignIn';
import { Chats } from './src/pages/chats/chats';
import router from './src/core/Router';
import AuthController from './src/controllers/AuthController';

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile',
  Chats = '/chats'
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignIn)
    .use(Routes.Register, SignUp)
    .use(Routes.Profile, Profile)
    .use(Routes.Chats, Chats)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {

    await AuthController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (e) {
    console.log(e, 'Here')
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
