import Block from "../../../../js/libs/Block";
import chatItemTemplate from './chat-item.hbs'
import {NestedObject} from "../../../../js/libs/Types.ts";


export default class ChatItem extends Block {
    constructor(props:NestedObject) {
        super('div', Object.assign(props, {attr: {
            class: 'chat__item',
            }}));
    }

    render() {
        return chatItemTemplate({
            img: this.getData<string>('img'),
            name: this.getData<string>('name'),
            desc: this.getData<string>('desc'),
        })
    }
}
