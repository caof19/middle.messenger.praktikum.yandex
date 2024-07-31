import Block from "../../../../js/libs/Block";
import MsgItemTemplate from './message_item.hbs'
import {NestedObject} from "../../../../js/libs/Types.ts";

export default class MessageItem extends Block{
    constructor(props:NestedObject) {
        if(!props.data ) {
            props.data = {}
        }
        if(props.data.self === undefined) {
            props.data.self = true;
        }
        const className = props.data.self ? 'messages__item messages__item--self' : 'messages__item';
        super('div', Object.assign(props,{
            attr: {
                class: className,
            }
        }));
    }

    render() {
        return MsgItemTemplate({
            avatar: this.getData<string>('avatar'),
            text: this.getData<string>('text'),
        })
    }
}