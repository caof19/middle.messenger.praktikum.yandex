import {expect} from 'chai';
import {useFakeXMLHttpRequest, SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic,} from 'sinon';
import Req from '../js/libs/Request.js';

describe('Req class', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let requests: SinonFakeXMLHttpRequest[];

    beforeEach(() => {

        xhr = useFakeXMLHttpRequest();
        requests = [];

        xhr.onCreate = xhrObj => {
            requests.push(xhrObj);
        };
    });

    afterEach(() => {
        xhr.restore();
    });


    it('Проверка отправки GET запроса', (done) => {
        const req = new Req();
        const url = 'https://example.com';

        req.get(url).then(() => {
            expect(requests[0].method).to.equal('GET');
            done();
        });



        setTimeout(() => {
            requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));
        }, 0)
    });

    it('Проверка отправки post запроса с данными', (done) => {
        const req = new Req();
        const url = 'http://example.com';
        const data = {key: 'value'};

        req.post(url, {data}).then(() => {
            expect(requests[0].method).to.equal('POST');
            expect(JSON.parse(requests[0].requestBody)).to.deep.equal(data);
            done();
        });

        requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({success: true}));
    });

    it('Проверка выдачи ошибки при отправки запроса без метода', (done) => {
        const req = new Req();
        const url = 'http://example.com';

        req.request(url, {method: ''}).catch((error) => {
            expect(error).to.equal('No method');
            done();
        });
    });

});
