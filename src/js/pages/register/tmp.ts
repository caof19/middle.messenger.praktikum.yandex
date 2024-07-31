import { textConst } from './lang.js';
import Input from "../../../templates/input/Input";
import Button from "../../../templates/btn/Btn";
import Form from "../../../templates/form/Form";

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
                }
            })
        )
    })

    const button = new Button({
        data: {
            text: 'Создать пользователя',
            class: 'btn__login',
        },
    })

    const form = new Form({
        children: {
            inputSection: inputsBlocks,
            buttonSection: [button]
        }
    });

    form.insertToDOM('.register');
});
