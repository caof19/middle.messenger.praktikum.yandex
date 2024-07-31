import Block from "../../../../js/libs/Block";
import ProfileTemplate from "./profile.hbs";
import {DefaultObjectString, NestedObject} from "../../../../js/libs/Types.ts";

export default class Profile extends Block{
    constructor(props:NestedObject){
        super('div', Object.assign(props, {
            attr: {
                class: 'profile',
            }
        }))
    }

    render() {
        const settings:DefaultObjectString = {
          avatar: this.getData<string>('avatar') || '',
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

        return ProfileTemplate(settings)
    }
}