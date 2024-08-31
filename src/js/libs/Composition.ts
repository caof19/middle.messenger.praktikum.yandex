import Block from "./Block.ts";
import {NestedObject} from "./Types.ts";
import Router from "./Router.ts";

class Composition {

    public wrapper:Block;
    private wrapperClass:string;
    private wrapperElement:HTMLElement | null;
    private additionalWrapperClass:string;
    private bodyClass:string;
    private globalValueLinks:{[key:string]:Array<Block>} = {};
    private beforeRender:()=>void;

    public router:Router;
    public props:NestedObject;

    constructor() {
        this.wrapperClass = 'app';
        this.additionalWrapperClass = 'page';
        this.bodyClass = 'page';
        this.wrapperElement = document.querySelector('.'+this.wrapperClass);
        this.router = new Router();

        this.navigate = this.navigate.bind(this);
    }

    public composit(setCompos: () => NestedObject) {
        this.props = setCompos();
    }

    public setWrapper(wrapper:Block) {
        this.wrapper = wrapper;
    }
    public render() {
        this.setClassToWrapper();
        this.setBodyClass();

        if(this.beforeRender) {
            this.beforeRender();
        }

        if(this.wrapperElement) {
            this.wrapperElement.innerHTML = '';
        }

        this.wrapper.insertToDOM('.'+this.wrapperClass);
    }

    public addWrapperClass(wrapperClass:string) {
        this.removeWrapperClass();
        this.additionalWrapperClass = wrapperClass;
    }

    public addBodyClass(bodyClass:string) {
        this.bodyClass = bodyClass;
    }

    public navigate(uri:string) {
        this.router.go(uri);
    }

    public getAllData() {
        return this.wrapper.getAllPropsData();
    }
    public setLinkToValue(alias:string, block:Array<Block>) {
        this.globalValueLinks[alias] = block;
    }

    public getValueByLink(alias:string):Array<Block> {
        return this.globalValueLinks[alias];
    }

    public addBeforeRender(func:()=>void) {
        this.beforeRender = func;
    }

    public getWrapper() {
        return this.wrapper;
    }

    private removeWrapperClass() {
        if(this.wrapperElement) {
            this.wrapperElement.className = this.wrapperClass;
        }
    }


    private setClassToWrapper() {
        if(this.wrapperElement) {
            this.wrapperElement.classList.add(this.additionalWrapperClass);
        }
    }

    private setBodyClass() {
        document.body.className = '';
        document.body.classList.add(this.bodyClass);
    }
}

export default Composition;