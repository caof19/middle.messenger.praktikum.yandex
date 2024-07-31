import Block from "../../js/libs/Block";
import inputTemplate from './input.hbs'
import FormModel from '../../js/models/FormModel'
import {NestedObject} from "../../js/libs/Types.ts";

export default class Input extends Block {
    constructor(props:NestedObject) {
        let name = ''
        if(props.data && props.data.name){
            name = props.data.name.toString();
        }
        super('label', Object.assign(props,{
            attr: {
                class: 'input__wrap',
                for: name,
            },
            events: {
                input: (e:InputEvent) => {
                    const target = e.target as HTMLInputElement;
                    this.setDataWithoutRerender({
                        value: target.value,
                    });
                },
            }
        }));
    }

    render() {
        return inputTemplate({
            text: this.getData<string>('text'),
            type: this.getData<string>('type'),
            name: this.getData<string>('name'),
            placeholder: this.getData<string>('placeholder'),
            errText: this.getData<string>('errText'),
            value: this.getData<string>('value'),
        })
    }

    addEvents() {
        super.addEvents();
        
        const input = this.element.querySelector('input');
        if(!input) {
            return;
        } 
        
        input.addEventListener('blur', () => {
            const form = new FormModel();
            const data = this.getData<{[key:string]: boolean | number | Array<string> | undefined}>('rules');

            if(!data) {
                return;
            }

            form.checkOnlyField(this, data)
        })
    }
}