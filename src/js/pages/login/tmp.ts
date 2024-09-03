import {textConst} from './lang';

import Button from '../../../templates/btn/Btn';
import Input from '../../../templates/input/Input';
import {Link} from "../../../templates/link/Link";
import Composition from "../../libs/Composition.ts";
import Form from "../../../templates/form/Form.ts";
import User from "../../libs/User.ts";


const login = new Composition();

login.composit(function(this: Composition)  {

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
                    value: input.value,
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
        },
        events: {
            click: function (e:MouseEvent) {
                e.preventDefault();
                login.router.go('/sign-up');

                return false;
            }
        }
    })

    return {
        children: {
            inputSection: inputsBlocks,
            buttonSection: [button, link]
        },
    };

})

    login.addBeforeRender(async () => {
        setTimeout(async () => {
            const user = new User();

            const isAuth = await user.isAuth();

            if(isAuth) {
                login.navigate('/messenger')
            }
        }, 1000)
    })
login.setWrapper(new Form(login.props, function(values) {
    const user = new User();

    try {
        user.signIn(values).then(res => {
            if (res.status === 200 && res.responseText === 'OK') {
                login.navigate('/messenger');
            } else {
                alert(JSON.parse(res.responseText).reason)
            }
        })
    } catch (error) {
        console.error('An error occurred while login processing:', error);
    }
}));
login.addWrapperClass('login');
login.addBodyClass('page--login');

export default login;
