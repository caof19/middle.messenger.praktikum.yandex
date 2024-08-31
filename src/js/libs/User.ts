import Req from "./Request.ts";
import {DOMAIN} from "../../constants.ts";
import {DefaultObjectString} from "./Types.ts";


export default class User {
    private server:Req;
    private static instance:User;
    private id:number;

    constructor() {
        this.server = new Req();

        if(User.instance) {
            return User.instance;
        }

        User.instance = this;
    }

    public async isAuth() {
        const response = await this.getInfo();
        // console.log(response.status === 200)

        if(response.status === 200) {
            return true;
        }
        return false;
    }

    public getInfo(): Promise<XMLHttpRequest> {
        return this.server.get(DOMAIN+'/auth/user')
    }

    public signIn(values:DefaultObjectString): Promise<XMLHttpRequest> {
        return this.server.post(DOMAIN+'/auth/signin', {data:values});
    }

    public logout() {
        this.server.post(DOMAIN+'/auth/logout')
    }

    public signup(values:DefaultObjectString) {
        return this.server.post(DOMAIN+'/auth/signup', {data: values})
    }
    public changeProfile(values:DefaultObjectString) {
        return this.server.put(DOMAIN+'/user/profile', {data:values})
    }

    public changePass(values:DefaultObjectString) {
        return this.server.put(DOMAIN+'/user/password', {data:values})
    }

    public setId(id:number) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public searchUser(userLogin:string) {
        return this.server.post(DOMAIN+'/user/search', {data: {login:userLogin}});
    }

    public changeAvatar(values:FormData) {
        return this.server.put(DOMAIN+'/user/profile/avatar', {data: values});
    }
}