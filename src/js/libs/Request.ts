type requestOptions = {
    data?: { [key: string]: string },
    method?: string,
    timeout?: number,
    headers?: { [key: string]: string },
}

class Req {

    static METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
    } as const;

    private queryStringify(data: { [key: string]: string }) {
        if (typeof data !== 'object') {
            throw new Error('Data must be object');
        }

        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }

    public get = (url: string, options: requestOptions = {
        timeout: 0
    }) => {

        return this.request(url, {...options, method: Req.METHODS.GET}, options.timeout);
    };

    public post = (url: string, options: requestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.POST}, options.timeout);
    };

    public put = (url: string, options: requestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.PUT}, options.timeout);
    };

    public delete = (url: string, options: requestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.DELETE}, options.timeout);
    };

    public request = (url: string, options: requestOptions = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === Req.METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${this.queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

const req = new Req();
req.get('https://google.com')
