import {textConst} from './lang.js';
import Input from "../../../templates/input/Input";
import Button from "../../../templates/btn/Btn";
import Composition from "../../libs/Composition.ts";
import Form from "../../../templates/form/Form.ts";
import User from "../../libs/User.ts";
import login from "../login/tmp.ts";


const register = new Composition();

register.composit(() => {
    const {inputs} = textConst;

    const inputsBlocks: Array<Input> = []

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

    return {
        children: {
            inputSection: inputsBlocks,
            buttonSection: [button]
        }
    }
})

register.addBeforeRender(async () => {
    setTimeout(async () => {
        const user = new User();

        const isAuth = await user.isAuth();
        console.log(isAuth);

        if(isAuth) {
            login.navigate('/messenger')
        }
    }, 1000)
})
register.addWrapperClass('register');
register.addBodyClass('page--register');
register.setWrapper(new Form(register.props, function(values) {
    const user = new User();

    user.signup(values).then(res => {
        if(res.status === 200 && res.responseText) {
            const response = JSON.parse(res.responseText);

            if(response.id) {
                register.navigate('/messenger')
            }
        } else {
            alert(JSON.parse(res.responseText).reason)
        }
    })
}));

export default register;
