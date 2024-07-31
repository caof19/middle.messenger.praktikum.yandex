import Block from "../../../js/libs/Block";
import ParentTemplate from './parent.hbs'
import {DefaultObjectString, NestedObject} from "../../../js/libs/Types.ts";

export default class ChatWrapper extends Block {
    constructor(props: NestedObject) {
        super('div', props);
    }

    render(): string {
        const settings: DefaultObjectString = {}

        if (!this.meta.props.children) {
            return '';
        }

        Object.keys(this.meta.props.children).forEach(key => {
            if (!this.meta.props.children || !('placeholderElem' in this.meta.props.children[key])) {
                return;
            }

            settings[key] = this.meta.props.children[key].placeholderElem;
        })

        return ParentTemplate(settings);
    }
}
