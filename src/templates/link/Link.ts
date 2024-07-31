import Block from "../../js/libs/Block";
import LinkTemplate from "./link.hbs";
import {NestedObject} from "../../js/libs/Types.ts";

export class Link extends Block {
    constructor(props:NestedObject) {
        super('div', props);
    }

    render() {
        return LinkTemplate({
            href: this.getData<string>('href'),
            text: this.getData<string>('text'),
        });
    }
}
