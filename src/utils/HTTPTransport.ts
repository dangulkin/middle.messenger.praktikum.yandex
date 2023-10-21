/* eslint-disable @typescript-eslint/no-unused-vars */
const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

/**
 * Transforms an object into a query string.
 * Example: { a: 1, b: 2, c: { d: 123 }, k: [1, 2, 3] }
 * Output: '?a=1&b=2&c=[object Object]&k=1,2,3'
 */
function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object')
	throw new Error('Data must be object');

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

interface RequestOptions {
  headers?: Record<string, string>;
  method?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  timeout?: number;
}

class HTTPTransport {
  get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: RequestOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise<XMLHttpRequest>(function (resolve, reject) {
			if (!method) {
        reject('No method');
        return;
      }
			
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data ? `${url}${queryStringify(data)}` : url
      );

      Object.keys(headers).forEach((key:string) => {
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
        xhr.send(data);
      }
    });
  };
}

function fetchWithRetry(url: string, retries: number = 3, options: RequestOptions) {

	function onError(err: unknown, tries: number): Promise<unknown> {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return fetchWithRetry(url, triesLeft, options);
  }

	return new Promise<unknown>((resolve, reject) => {
    let tries = retries;

    function doRequest() {
      new HTTPTransport()
        .request(url, options)
        .then(resolve)
        .catch(err => {
          onError(err, tries)
            .then(() => {
              tries--;
              doRequest();
            })
            .catch(reject);
        });
    }

    doRequest();
  });
 }
