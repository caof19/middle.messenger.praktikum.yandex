import Composition from "./Composition.ts";

class Router {

    private routes: {[key:string]: Composition};
    private history: History;
    private static __instance:Router;
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.history = window.history;
        this.routes = {};

        Router.__instance = this;

        window.onpopstate = () => {
            this.use(window.location.pathname);
        }
    }

    public register(uri:string, page:Composition) {
        this.routes[uri] = page;

        return this;
    }

    public use(uri:string) {
        this.routes[uri].render();
    }

    public go(uri:string) {
        this.history.pushState({}, '', uri)
        this.use(uri);
    }

    // private notFoundPage() {
    //
    // }
}

export default Router;