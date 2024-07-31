import {textConst} from './lang';

import Form from '../../../templates/form/Form';
import Button from '../../../templates/btn/Btn';
import Input from '../../../templates/input/Input';
import {Link} from "../../../templates/link/Link";


document.addEventListener('DOMContentLoaded', () => {
    const {inputs} = textConst;

    const inputsBlocks:Array<Input> = []

    inputs.forEach(input => {
        inputsBlocks.push(
            new Input({
                data: {
                    text: input.text,
                    type: input.type,
                    name: input.name,
                    placeholder: input.placeholder,
                    rules: input.rules,
                },
            })
        )
    })

    const button = new Button({
        data: {
            text: 'Войти',
            class: 'btn__login',
        },
    })

    const link = new Link({
        data: {
            href: textConst.link,
            text: textConst.linkText,
        }
    })

    const form = new Form({
        children: {
            inputSection: inputsBlocks,
            buttonSection: [button, link]
        },
    });

    form.insertToDOM('.login');
});
