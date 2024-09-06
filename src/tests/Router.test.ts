import Router from "../js/libs/Router.ts";
import {assert} from "chai";
import Composition from "../js/libs/Composition.ts";
import Block from "../js/libs/Block.js";


describe('Тестируем роутер', function () {
    const router = new Router();
    const testComposition = new Composition();
    testComposition.setWrapper(new Block('div', {}));

    it('Добавление пути в роутер', function () {
        router.register('/test', testComposition);
        assert.lengthOf(Object.keys(router.getAllRoutes()), 1)
    })

    it('Переход по пути', function () {
        router.register('/test', testComposition);
        router.go('/test');
        assert.equal(window.location.pathname, '/test')
    })
})
