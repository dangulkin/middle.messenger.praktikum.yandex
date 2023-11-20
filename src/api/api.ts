import { HTTPTransport } from '../utils/Transport/HTTPTransport';

export abstract class API{
	protected http: HTTPTransport;

	constructor(path:string){
		this.http = new HTTPTransport(path);
	}
}
