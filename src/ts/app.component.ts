import {Component, OnInit} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
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
					<div [ngClass]="setButtonClass('home')" (click)="navHome()">Home</div>
					<div [ngClass]="setButtonClass('my-polls')" (click)="navMyPolls()" *ngIf="credentials.loggedIn">My Polls</div>
					<a [routerLink]="['NewPoll']"><div [ngClass]="setButtonClass('new-poll')" *ngIf="credentials.loggedIn">New Poll</div></a>
					<div class="button" (click)="handleLogging()">
						<div *ngIf="credentials.loggedIn">{{credentials.user.username}}</div>
						<div>{{loginButton}}</div>
					</div>
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
	myPollsFiltering: boolean = false;
	
	constructor(private authService: AuthService, private router: Router) {	}
	
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
	
	navHome() {
		if (!this.router.isRouteActive(this.router.generate(['PollContainer']))) {
			this.myPollsFiltering = false;
			this.router.navigate(['PollContainer']);
		} else if (this.myPollsFiltering) {
			this.myPollsFiltering = false;
			this.router.navigate(['PollContainer']);
		}
	}
	
	navMyPolls() {
		if (!this.router.isRouteActive(this.router.generate(['PollContainer']))) {
			this.myPollsFiltering = true;
			this.router.navigate(['PollContainer', {user: this.credentials.user.githubID}]);
		} else if (!this.myPollsFiltering) {
			this.myPollsFiltering = true;
			this.router.navigate(['PollContainer', {user: this.credentials.user.githubID}]);
		}
	}
	
	setButtonClass(button: string) {
		let inactiveButton = {"button": true, "active-button": false};
		let activeButton = {"button": false, "active-button": true};
		switch (button) {
			case 'home':
				if (this.router.isRouteActive(this.router.generate(['PollContainer'])) 
						&& !this.myPollsFiltering) return activeButton;
				else return inactiveButton;
			case 'my-polls':
				if (this.router.isRouteActive(this.router.generate(['PollContainer']))
						&& this.myPollsFiltering) return activeButton;
				else return inactiveButton;
			case 'new-poll':
				if (this.router.isRouteActive(this.router.generate(['NewPoll']))) return activeButton;
				else return inactiveButton;
			default:
				return inactiveButton;
		}
	}
}