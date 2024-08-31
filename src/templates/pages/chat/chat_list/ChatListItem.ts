import Block from "../../../../js/libs/Block";
import listItemTemplate from './chatListItem.hbs'
import {NestedObject} from "../../../../js/libs/Types.ts";

export default class MessageListItem extends Block{
    constructor(props:NestedObject) {
        if(!props.data ) {
            props.data = {}
        }

        const className = 'chat__single';
        super('div', Object.assign(props,{
            attr: {
                class: className,
            }
        }));
    }

    render() {
        return listItemTemplate({
            text: this.getData<string>('text'),
        })
    }
}
