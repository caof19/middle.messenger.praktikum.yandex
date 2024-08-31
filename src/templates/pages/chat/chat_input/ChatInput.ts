import Block from "../../../../js/libs/Block";
import ChatInputTemplate from './chat_input.hbs'
import {DefaultObjectString, NestedObject} from "../../../../js/libs/Types.ts";

export default class ChatInput extends Block {
    constructor(props:NestedObject) {
        super('form', Object.assign(props,{
            attr: {
                class: 'chat__inputs',
            }
        }));
    }

    render() {
        const settings:DefaultObjectString = {};

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


        return ChatInputTemplate(settings)
    }
}
