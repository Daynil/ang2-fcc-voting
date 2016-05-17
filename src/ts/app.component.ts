import {Component, OnInit} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {PollContainer} from "./poll-container.component";
import {NewPoll} from "./new-poll.component";
import {AfterAuth} from "./after-auth.component";
import {AuthService} from "./auth.service";
import {PollsService} from "./polls.service";
import {User, Credentials} from "./User";

@Component({
	selector: 'my-app',
	styleUrls: ['../css/app.css'],
	template: `
		<div id="wrapper">
			<div id="header">
				<h1>FCC Voting App</h1>
				<div id="menu">
					<a [routerLink]="['PollContainer']"><div class="button">Home</div></a>
					<a [routerLink]="['NewPoll']"><div class="button" *ngIf=credentials.loggedIn>New Poll</div></a>
					<div class="button" (click)="handleLogging()">{{loginButton}}</div>
				</div>
			</div>
			<router-outlet></router-outlet>
		</div>
	`,
	directives: [PollContainer, ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, PollsService]
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
export class AppComponent implements OnInit {
	loginButton = 'Log In';
	credentials: Credentials = {loggedIn: false, user: null};
	
	constructor(private authService: AuthService) {	}
	
	ngOnInit() {
		this.checkLoggedState();
	}

	checkLoggedState() {
		if (this.credentials) this.checkLoginButton();
		this.authService.checkLoggedState()
			.then((creds: Credentials) => {
				this.credentials = creds;
				this.checkLoginButton();
			});
	}
	
	checkLoginButton() {
		if (this.credentials.loggedIn) {
			this.loginButton = 'Log Out';
		} else {
			this.loginButton = 'Log In';
		}
	}
	
	handleLogging() {
		this.authService.handleAuthLogging().then(res => this.checkLoggedState());
	}
}