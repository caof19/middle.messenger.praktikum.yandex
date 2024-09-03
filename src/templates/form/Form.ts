import Block from "../../js/libs/Block";
import FormTemplate from '../form/form.hbs'
import FormModel from "../../js/models/FormModel";
import {DefaultObjectString, NestedObject} from "../../js/libs/Types.ts";

export default class Form extends Block{
    constructor(props:NestedObject, submitAdditional?:(e:{[key:string]:string}) => void) {
        super('div', Object.assign(props, {
            events: {
                submit: (e:SubmitEvent) => {
                    e.preventDefault();

                    const formModel = new FormModel();
                    const inputs = this.getChildren('inputSection')

                    if(!inputs) {
                        return;
                    }

                    formModel.checkAllFields(inputs);

                    const values:{[key:string]:string} = {};

                     inputs.forEach(elem => {
                         const key:string|undefined = elem.getData<string>('name'),
                             val:string|undefined = elem.getData<string>('value');

                         if(!val || !key) {
                             return;
                         }

                         values[key] = val;
                     })



                    if(submitAdditional) {
                       submitAdditional(values);
                    }
                }
            }
        }));
    }

    render():string {
        const settings:DefaultObjectString = {
            uniqId: 'login-form',
        }

        if(!this.meta.props.children) {
            return '';
        }
        Object.keys(this.meta.props.children).forEach(key => {
            if(!this.meta.props.children || !('placeholderElem' in this.meta.props.children[key])) {
                return ;
            }
            settings[key] = this.meta.props.children[key].placeholderElem;
        })

        return FormTemplate(settings)
    }
}
