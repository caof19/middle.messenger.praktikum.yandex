import Block from "../../../../js/libs/Block.ts";
import {DefaultObjectString, NestedObject} from "../../../../js/libs/Types.ts";
import ProfileAvatarTemplate from "./profile_avatar.hbs";

export default class ProfileAvatar extends Block {
    constructor(props:NestedObject) {
        super('form', Object.assign(props,{
            attr: {
                class: 'chat__avatar',
                enctype: 'multipart/form-data',
            },
        }));
    }

    render() {
        const settings:DefaultObjectString = {};


        return ProfileAvatarTemplate(settings)
    }
}
