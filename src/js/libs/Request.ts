
type RequestOptions = {
    data?: { [key: string]: string | number | number[] } | FormData,
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

    private escapeString(str: string): string {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    private queryStringify(data: { [key: string]: string | number | number[] | FormData }) {
        if (typeof data !== 'object') {
            throw new Error('Data must be object');
        }

        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            let value = data[key];
            if (typeof value === 'string') {
                value = this.escapeString(value); // Экранирование строки
            }
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }

    public get = (url: string, options: RequestOptions = {
        timeout: 0
    }) => {

        return this.request(url, {...options, method: Req.METHODS.GET}, options.timeout);
    };

    public post = (url: string, options: RequestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.POST}, options.timeout);
    };

    public put = (url: string, options: RequestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.PUT}, options.timeout);
    };

    public delete = (url: string, options: RequestOptions = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: Req.METHODS.DELETE}, options.timeout);
    };

    public request = (url: string, options: RequestOptions = {}, timeout = 5000):Promise<XMLHttpRequest> => {
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
                isGet && !!data && !(data instanceof FormData)
                    ? `${url}${this.queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            if(!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            xhr.withCredentials = true;

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
                if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    const sanitizedData = Object.fromEntries(
                        Object.entries(data).map(([key, value]) => [
                            key,
                            typeof value === 'string' ? this.escapeString(value) : value
                        ])
                    );
                    xhr.send(JSON.stringify(sanitizedData));
                }
            }
        })
    };
}

export default Req;
