import {Component} from "@angular/core";
import * as _ from 'lodash';
import {Poll} from "./Poll";
import {PollDetails} from "./poll-details.component";

@Component({
    selector: 'poll-container',
    styleUrls: ['../css/app.css'],
    template: `
        <div class="poll-wrapper">
            <div id="poll-list" [ngClass]="{'show-details': (selectedPoll !== null)}">
                <div *ngFor="let poll of polls" [ngClass]="setPollClass(poll)" (click)="selectPoll(poll)">
                    {{ poll.name }}
                </div>
            </div>
            <poll-details [poll]="selectedPoll"></poll-details>
        </div>
    `,
    directives: [PollDetails]
})

export class PollContainer {
    polls: [Poll] = [];
    selectedPoll = null;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.polls.push({
               name: _.random(100, 999)
            });
        }
    }

    setPollClass(poll: Poll) {
        return {
            "poll": true,
            "selected": poll === this.selectedPoll
        }
    }

    selectPoll(pollClicked: Poll) {
        this.selectedPoll = pollClicked;
    }

}