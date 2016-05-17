import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
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
	
	createPoll(poll: Poll) {
		let stringyPoll = JSON.stringify(poll);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers })
		console.log(stringyPoll);
		return this.http
					.post('/api/newpoll', stringyPoll, options)
					.toPromise();
	}
}