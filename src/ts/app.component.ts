import {Component} from "angular2/core";
import {PollContainer} from "./poll-container.component";

@Component({
	selector: 'my-app',
	styleUrls: ['../css/app.css'],
	template: `
		<div id="wrapper">
			<div id="header">
				<h1>FCC Voting App</h1>
				<div id="menu">
					<div class="button">Home</div>
					<div class="button">New Poll</div>
					<div class="button" (click)="handleLogging()">{{ loginButton }}</div>
				</div>
			</div>
			<poll-container></poll-container>
		</div>
	`,
	directives: [PollContainer]
})
export class AppComponent {
	loginButton = 'Log In';

	constructor() {

	}

	handleLogging() {

	}
}