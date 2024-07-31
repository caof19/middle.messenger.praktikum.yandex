import Block from "../../../../js/libs/Block";
import ChatHeaderTemplate from "./chat_header.hbs";
import {DefaultObjectString, NestedObject} from "../../../../js/libs/Types.ts";

export default class ChatHeader extends Block {
    constructor(props:NestedObject){
        super('div', Object.assign(props, {
            attr: {
                class: 'chat_header',
                id: 'chat_header',
            }
        }))
    }

    render() {
        const settings:DefaultObjectString = {
          img: this.getData<string>('img') || '',
        }

        if(!this.meta.props.children) {
            return '';
        }

        if(this.isHaveChildren()) {
            Object.keys(this.meta.props.children).forEach(key => {
                if (!this.meta.props.children || !('placeholderElem' in this.meta.props.children[key])) {
                    return;
                }

                settings[key] = this.meta.props.children[key].placeholderElem;
            })
        }

        return ChatHeaderTemplate(settings)
    }
}