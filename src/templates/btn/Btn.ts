import Block from '../../js/libs/Block'
import BtnTemplate from './btn.hbs'
import {NestedObject} from "../../js/libs/Types.ts";

export default class Button extends Block {
    constructor(props:NestedObject) {
        super('div', props);
    }

    render() {
        return BtnTemplate({
                text: this.getData<string>('text'),
                addClass: this.getData<string>('class'),
            }
        );
    }
}