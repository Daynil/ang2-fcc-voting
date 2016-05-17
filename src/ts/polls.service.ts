import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Poll} from "./Poll";

@Injectable()
export class PollsService {
	allPolls: Poll[];
	
	constructor (private http: Http) { }
	
	private parseData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error(`Response status: ${res.status}`);
		}
		let body = res.json();
		return body;
	}

	private handleError(error: any) {
		let errMsg = error.message || 'Server error';
		console.log(errMsg);
		return Observable.throw(errMsg);
	}
	
	getAllPolls() {
		if (this.allPolls) return Promise.resolve(this.allPolls);
		else {
			return this.http
						.get('/api/polllist')
						.toPromise()
						.then(this.parseData)
						.catch(this.handleError)
		}
	}
}