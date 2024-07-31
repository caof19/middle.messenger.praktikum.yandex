import Block from "../libs/Block";

export default class FormModel {
    checkOnlyField(elem:Block, rules:{[key:string]: boolean | number | Array<string> | undefined}) {
        const value = elem.getData<string>('value') || '';
        let errText = '';

        console.log(rules);

        Object.keys(rules).forEach(rule => {

            if(rules[rule] === undefined) {
                return;
            }

            switch (rule) {
                case 'minWidth':
                    if(value.length < +rules[rule]) {
                        errText = 'Поле должно быть от '+rules[rule]+' символов';
                    }
                    break;
                case 'maxWidth':
                    if(value.length > +rules[rule]) {
                        errText = 'Поле должно быть до '+rules[rule]+' символов';
                    }
                    break;
                case 'onlyEng': {
                    if (!rules[rule]) {
                        break;
                    }
                    const regEng = /^[A-Za-z0-9\s.,]+$/;
                    if (!regEng.test(value)) {
                        errText = 'Поле должно содержать только латинские символы';
                    }
                    break;
                }
                case 'onlyNumber': {
                    if (rules[rule]) {
                        const regexOnlyNumPlus = /^\+?\d+$/
                        if (!regexOnlyNumPlus.test(value)) {
                            errText = 'Проверьте правильность введенного телефона';
                        }
                        break;
                    }
                    const regexOnlyNum = /\D/;
                    if (!regexOnlyNum.test(value)) {
                        errText = 'Поле должно содержать не только цифры';
                    }
                    break;
                }
                case 'spaces':
                    if(rules[rule]) {
                        break;
                    }
                    if(value.includes(' ')) {
                        errText = 'Поле не должно содержать пробелов';
                    }
                    break;
                case 'specialChars':
                    if(!Array.isArray(rules[rule])) {
                        break;
                    }
                    if(this.containsUnauthorizedSpecialCharacters(value, rules[rule])) {
                        errText = 'Поле содержит запрещенные символы';
                    }
                    break;
                case 'evenNumber': {
                    const regexEvenNumber = /\d/;
                    if (!regexEvenNumber) {
                        errText = 'Поле должно содержать хоть одну цифру';
                    }
                    break;
                }
                case 'evenUppercase':
                    if(value === value.toLowerCase()) {
                        errText = 'Поле должно содержать хоть одну заглавную букву';
                    }
                    break;
                case 'onlyLatRus': {
                        const regexOnlyLatRus = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
                        if (!regexOnlyLatRus.test(value)) {
                            errText = 'Поле может содержать только русские или латинские символы';
                        }
                    }
                    break;
                case 'firstLetterUpper':
                    if(!this.isFirstCharUpperCase(value)) {
                        errText = 'Поле должно начинаться с заглавного символа';
                    }
                    break;
                case 'email':
                    if(!this.validateEmail(value)) {
                        errText = 'Проверьте свою почту';
                    }
                    break;

            }
        })

        if(value.length === 0) {
            errText = 'Поле не должно быть пустым';
        }


        elem.setPropsData({
             errText: errText
        })
    }

    public checkAllFields(inputs:Array<Block>) {
        inputs.forEach(item => {
            this.checkOnlyField(item, item.getData('rules') || {})
        })
    }

    private containsUnauthorizedSpecialCharacters(str:string, allowedChars:Array<string> = []) {
        const allSpecialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

        const allowedSet = new Set(allowedChars);

        for (const char of str) {
            if (allSpecialChars.includes(char) && !allowedSet.has(char)) {
                return true;
            }
        }

        return false;
    }

    private isFirstCharUpperCase(str:string) {
      if (str.length === 0) return false; // Проверяем, что строка не пустая
      return str.charAt(0) === str.charAt(0).toUpperCase();
    }
    private validateEmail = (email:string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
}
