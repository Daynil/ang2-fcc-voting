import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Poll} from "./Poll";

@Injectable()
export class PollsService {
	allPolls: Poll[];
	pollUpdated: EventEmitter<Poll> = new EventEmitter<Poll>();
	pollDeleted: EventEmitter<Poll> = new EventEmitter<Poll>();
	
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
		return this.http
					.post('/api/newpoll', stringyPoll, options)
					.toPromise()
					.then(this.parseData)
					.then(res => res.poll)
					.catch(this.handleError);
	}
	
	submitVote(poll: Poll, choiceText: string) {
		let body = JSON.stringify({
			poll: poll,
			choiceText: choiceText
		});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http
					.post('/api/submitvote', body, options)
					.toPromise()
					.then(this.parseData)
					.then(res => {
						this.pollUpdated.emit(res.poll);
						return res;
					})
					.catch(this.handleError);
	}
	
	deletePoll(poll: Poll) {
		let body = JSON.stringify({poll: poll});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http
					.post('/api/deletepoll', body, options)
					.toPromise()
					.then(res => {
						console.log(res.status);
						if (res.status === 200) {
							this.pollDeleted.emit(res.json().poll);
						}
					})
					.catch(this.handleError);
	}
}