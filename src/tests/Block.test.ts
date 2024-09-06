import {describe} from "mocha";
import Block from "../js/libs/Block.js";
import Handlebars from "handlebars";
import {assert} from "chai";

describe('Проверка класса Block', function () {

    const btn = new Block('button',{
        attr: {
          class: 'test1',
        },
        data: {
            text: 'Test',
        }
    });

    btn.render = function () {
        const BtnTemplate = Handlebars.compile('<button class="{{ addClass }}">{{ text }}</button>');
        return BtnTemplate({
                text: btn.getData<string>('text'),
                addClass: btn.getData<string>('class'),
            }
        );
    }

    it('Проверка сборки блока', function () {
        assert.equal(btn.getContent().tagName, 'BUTTON')
    })

    it('Проверка вставки класса', function () {
        assert.equal(btn.getContent().className, 'test1')
    })

    it('Проверка смены класса через манипуляцию данными', function () {
        btn.updatePropsAttr('class', 'test2')
        assert.equal(btn.getContent().className, 'test2')
    })

    it('Проверка смены текста через манипуляцию данными', function (){
        btn.updatePropsData('text', 'Success test');
        assert.equal(btn.getContent().textContent, 'Success test')
    })
})
