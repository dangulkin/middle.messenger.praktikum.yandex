import { Profile } from './src/pages/profile/profile';
import { Settings } from './src/pages/settings/Settings';
import { ChangePassword } from './src/pages/changepassword/ChangePassword';
import { SignUp } from './src/pages/signup/SignUp';
import { SignIn } from './src/pages/signin/SignIn';
import { Page500 } from './src/pages/page500/page500';
import { Chats } from './src/pages/chats/chats';
import router, { Routes } from './src/core/Router';
import AuthController from './src/controllers/AuthController';

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignIn)
    .use(Routes.Register, SignUp)
    .use(Routes.EditProfile, Settings)
    .use(Routes.Settings, Profile)
    .use(Routes.Password, ChangePassword)
    .use(Routes.Messenger, Chats)
		.use(Routes.Page500, Page500)

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
      router.go(Routes.Messenger);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
