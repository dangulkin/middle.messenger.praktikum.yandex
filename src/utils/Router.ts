import Block from "./Block";
import Route from "./Route";

class Router {
    private static __instance: Router | null = null;
    private routes: Route[];
    private history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block): Router {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = ((event: { currentTarget: { location: { pathname: string; }; }; }) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;

// const router = new Router(".app");

// // Можно обновиться на /user и получить сразу пользователя
// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();

// // Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go("/users");
// }, 1000);

// // А можно и назад
// setTimeout(() => {
//   router.back();
// }, 3000);

// // И снова вперёд
// setTimeout(() => {
//   router.forward();
// }, 5000);
