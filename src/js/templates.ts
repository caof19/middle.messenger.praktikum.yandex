import './pages/login/tmp';
import './pages/register/tmp';
import './pages/chat/tmp';

import '../templates/btn/Btn'
import Router from "./libs/Router.ts";
import login from "./pages/login/tmp.ts";
import register from "./pages/register/tmp.ts";
import chat from "./pages/chat/tmp.ts";

const routes = new Router()

routes.register('/', login)
    .register('/sign-up', register)
    .register('/messenger', chat);

routes.use(location.pathname);
