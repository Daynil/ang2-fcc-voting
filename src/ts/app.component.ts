import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {PollContainer} from "./poll-container.component";
import {NewPoll} from "./new-poll.component";
import {AfterAuth} from "./after-auth.component";

@Component({
	selector: 'my-app',
	styleUrls: ['../css/app.css'],
	template: `
		<div id="wrapper">
			<div id="header">
				<h1>FCC Voting App</h1>
				<div id="menu">
					<a [routerLink]="['PollContainer']"><div class="button">Home</div></a>
					<a [routerLink]="['NewPoll']"><div class="button">New Poll</div></a>
					<div class="button" (click)="handleLogging()">{{loginButton}}</div>
				</div>
			</div>
			<router-outlet></router-outlet>
		</div>
	`,
	directives: [PollContainer, ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
	{
		path: '/',
		name: 'PollContainer',
		component: PollContainer
	},
	{
		path: '/new-poll',
		name: 'NewPoll',
		component: NewPoll
	},
	{
		path: '/after-auth',
		name: 'AfterAuth',
		component: AfterAuth
	}
])
export class AppComponent {
	loginButton = 'Log In';

	constructor(private _http: Http) {

	}

	checkLoggedState() {
		this._http.get('/auth/checkCreds')
			.subscribe((res: any) => {
				let isLoggedIn = res._body;
				if (isLoggedIn) {
					console.log('logged in!');
					this.loginButton = 'Log Out';
				}
			})
	}

	handleLogging() {
		//TODO refactor oath code into service
		let oauthWindow = window.open('http://localhost:3000/auth/github',
									  'OAuthConnect',
									  'location=0,status=0,width=800,height=400');
		let oauthInterval = window.setInterval(() => {
			if (oauthWindow.closed) {
				window.clearInterval(oauthInterval);
				this.checkLoggedState();
			}
		}, 1000);
	}
}