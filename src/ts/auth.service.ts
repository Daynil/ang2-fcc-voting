import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User, Credentials} from "./User";

@Injectable()
export class AuthService {
	
	creds: Credentials = null;
	
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
	}
	
	checkLoggedState(): Promise<Credentials> {
		return new Promise((resolve, reject) => {
			if (this.creds) {
				resolve(this.creds);
			}
			else this.refreshLoggedState().then(res => {
				resolve(this.creds);				
			});
		});
		
	}
	
	private refreshLoggedState() {
		return this.http
					.get('/auth/checkCreds')
					.toPromise()
					.then(this.parseData)
					.then(res => {
						this.creds = res;
						return this.creds;
					})
					.catch(this.handleError);
	}
	
	handleAuthLogging(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.refreshLoggedState().then(res => {
				if (!res.loggedIn) {
					let oauthWindow = window.open('http://localhost:3000/auth/github',
												'OAuthConnect',
												'location=0,status=0,width=800,height=400');
					let oauthInterval = window.setInterval(() => {
						if (oauthWindow.closed) {
							window.clearInterval(oauthInterval);
							this.refreshLoggedState().then(resolve);
						}
					}, 1000);
				} else {
					this.http.get('/auth/logout').subscribe(res => {
						this.refreshLoggedState().then(resolve);
					});
				}
			});
		});
	}
}