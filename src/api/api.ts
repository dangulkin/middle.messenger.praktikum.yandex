import { HTTPTransport } from '../utils/http/HTTPTransport';

export abstract class API{
	protected http: HTTPTransport;

	constructor(path:string){
		this.http = new HTTPTransport(path);
	}
}
