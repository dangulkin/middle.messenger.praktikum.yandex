
import { METHODS, API_URL } from './constants';
type Options = {
  method: METHODS;
  data?: unknown;
};

type HTTPMethod = <R = unknown>(url: string, options?: unknown) => Promise<R>;

export class HTTPTransport {
  static API_URL = API_URL;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get:HTTPMethod = (path = '/') => {
    return this.request(this.endpoint + path);
  }

  public post: HTTPMethod = (path: string, data?: unknown) => {
    return this.request(this.endpoint + path, {
      method: METHODS.POST,
      data,
    });
  }

  public put: HTTPMethod = (path: string, data: unknown) => {
    return this.request(this.endpoint + path, {
      method: METHODS.PUT,
      data,
    });
  }

  public patch: HTTPMethod = (path: string, data: unknown) => {
    return this.request(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
    });
  }

  public delete: HTTPMethod = (path: string, data: unknown = {}) => {
    return this.request(this.endpoint + path, {
      method: METHODS.DELETE,
			data,
    });
  }

  private request:HTTPMethod = (url: string, options: Options = {method: METHODS.GET}) => {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if(data instanceof FormData){
				console.log('data is FormData');
				xhr.send(data);
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
