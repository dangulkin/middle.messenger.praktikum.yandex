import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport.ts';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    }

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('Method get() should be called with GET method', () => {
    instance.get('/');
    const [request] = requests;
    expect(request.method).to.equal('GET');
  });

	it("Method put() should be called using the PUT method", () => {
    instance.put('/path', {});
    const [request] = requests;
    expect(request.method).to.equal('PUT');
  });

  it("Method post() should be called using the POST method", () => {
    instance.post('/path');
    const [request] = requests;
    expect(request.method).to.equal('POST');
  });

  it('Method delete() should be called using the DELETE method', () => {
    instance.delete('/path');
    const [request] = requests;
    expect(request.method).to.equal('DELETE');
  });
});
