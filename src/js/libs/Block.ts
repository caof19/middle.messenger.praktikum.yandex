import EventBus from "./EventBus";
import {v4 as makeUUID} from 'uuid';
import { NestedObject} from "./Types.ts";


export default class Block {

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        RENDER: 'flow:component-render'
    } as const;

    public meta: { tagName: string, props: NestedObject };
    private eventBus: EventBus;
    protected element: HTMLElement;
    private props: NestedObject;

    constructor(tagName: string, props: NestedObject) {
        this.eventBus = new EventBus();
        this.meta = {
            tagName,
            props
        };

        this.props = this.setPropProxy(props)
        this.registerEvents();

        this.eventBus.emit(Block.EVENTS.INIT);
    }

    private registerEvents(): void {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this))
        this.eventBus.on(Block.EVENTS.RENDER, this._render.bind(this))
    }

    private componentDidUpdate() {
        this._render();
    }

    private init(): void {
        const {tagName} = this.meta;
        this.element = this.createElement(tagName);

        this.eventBus.emit(Block.EVENTS.RENDER);
    }

    private createElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private _render(): void {
        this.addAttributes();
        this.addPlaceholder();

        this.element.innerHTML = this.render();

        this.addEvents();

        this.compile();
    }

    private setPropProxy(props: NestedObject) {
        return new Proxy(props, {
            set: (target: NestedObject, prop: keyof NestedObject | string,
                  value: keyof NestedObject | string) => {

                if (prop in target) {
                  (target[prop as keyof NestedObject] as unknown) = value;
                }


                this.eventBus.emit(Block.EVENTS.FLOW_CDU);

                return true;
            }
        });
    }

    protected addEvents() {
        const {events} = this.meta.props;

        if (!events) {
            return;
        }

        Object.keys(events).forEach((eventName: string) => {
            this.element.addEventListener(eventName, events[eventName]);
        })
    }

    private addPlaceholder() {
        const {children} = this.meta.props;

        if (!children) {
            return;
        }


        Object.keys(children).forEach((sectionName: string) => {
            const child = children[sectionName];

            const id = makeUUID();

            if ('items' in child) {
                return;
            }

            if (this.meta.props.children) {
                this.meta.props.children[sectionName] = {
                    items: child,
                    placeholderId: id,
                    placeholderElem: '<div data-id="' + id + '"></div>'
                };
            }
        })
    }

    private addAttributes() {
        const {attr} = this.meta.props;

        if (!attr) {
            return;
        }

        Object.keys(attr).forEach((attrName) => {
            this.element.setAttribute(attrName, attr[attrName]);
        })
    }

    public compile() {
        const {children} = this.meta.props;

        if (!children) {
            return;
        }

        Object.keys(children).forEach((sectionName: string) => {
            if (!('placeholderId' in children[sectionName])) {
                return;
            }

            const wrapperElem = document.querySelector('[data-id="' + children[sectionName].placeholderId + '"]');
            const fragment = document.createDocumentFragment();

            children[sectionName].items.forEach((item: Block) => {
                if (wrapperElem) {
                    fragment.appendChild(item.getContent())
                }
            })

            if (wrapperElem) {
                wrapperElem.replaceWith(fragment);
            }
        })
    }

    public getData<T>(key: string): T | undefined {
        if (!this.meta.props.data || !this.meta.props.data[key]) {
            return undefined;
        }
        return this.meta.props.data[key] as T;

    }

    public getChildren(childrenSection: string):Array<Block> | undefined {
        if(!this.meta.props.children) {
            return undefined;
        }
        if (!('items' in this.meta.props.children[childrenSection])) {
            return undefined;
        }
        return this.meta.props.children[childrenSection].items;
    }

    public isHaveChildren(): boolean {
        return !!this.meta.props.children;
    }

    public getContent() {
        return this.element;
    }

    public setProps = (nextProps: NestedObject) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    /* Метод нужен для корректной работы перезаписывания. Потому что если в моей структуре делать setProps({data:{value: 'val'}}), то весь объект data перепишется и там будут только новые данные */
    public setPropsData = (nextProps: NestedObject['data']) => {
        if (!nextProps) {
            return false;
        }

        const buffer = this.props.data

        if (!buffer) {
            return false;
        }

        Object.keys(nextProps).forEach((key: string) => {
            buffer[key] = nextProps[key];
        })

        Object.assign(this.props, {data: buffer});
    };

    /* Метод для того чтоб положить в дейта данные, только не тригернуть прокси */
    public setDataWithoutRerender(nextProps: { [key: string]: unknown }) {
        if (!nextProps) {
            return;
        }

        if (!this.props.data) {
            this.props.data = {}; // Создаем пустой объект, если data не определено
        }

        Object.assign(this.props.data, nextProps);
    }

    public render(): string {
        return '';
    }

    public addChildren(component: Block, sectionName: string) {

        const buf = this.meta.props.children;

        if(!buf || !('items' in buf[sectionName])) {
            return;
        }

        buf[sectionName].items.push(component);

        this.setProps({
            children: buf
        })
    }

    public insertToDOM(query:string): void {

        const root = document.querySelector(query);
        if (!root) {
            return;
        }
        root.appendChild(this.getContent());

        this.compile();

        this.getAllChildrens().forEach(item => {
            item.compile();
        });
    }

    /* метод для компиляции всех вложенных Блоков */
    getAllChildrens() {
        let allChildren:Array<Block> = [];
        const children = this.meta.props.children;
        if(!children) {
            return [];
        }
        Object.keys(children).forEach(key => {
            if(!('items' in children[key])) {
                return;
            }
            children[key].items.forEach((item:Block) => {
                allChildren.push(item)
                if(item.isHaveChildren()) {
                    allChildren = [...allChildren, ...item.getAllChildrens()];
                }
            })
        })
        return allChildren;
    }
}
