import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {RouteParams, Router} from "@angular/router-deprecated";
import * as _ from 'lodash';
import {Poll} from "./Poll";
import {PollDetails} from "./poll-details.component";
import {PollsService} from "./polls.service";

@Component({
    selector: 'poll-container',
    styleUrls: ['../css/app.css'],
    template: `
        <div class="poll-wrapper">
            <div id="poll-list" [ngClass]="{'show-details': (selectedPoll !== null)}">
                <div *ngFor="let poll of polls" [ngClass]="setPollClass(poll)" (click)="selectPoll(poll)">
                    {{ poll.question }}
                </div>
            </div>
            <poll-details *ngIf="selectedPoll" [poll]="selectedPoll"></poll-details>
        </div>
    `,
    directives: [PollDetails]
})
export class PollContainer implements OnInit {
    polls: Poll[] = [];
    selectedPoll: Poll = null;

    constructor( private pollsService: PollsService, 
                 private router: Router, 
                 private routeParams: RouteParams,
                 private location: Location ) {
                     this.pollsService.pollUpdated.subscribe((updatedPoll: Poll) => {
                         let pollToUpdateIndex = this.polls.indexOf(_.find(this.polls, o => o._id === updatedPoll._id));
                         this.polls[pollToUpdateIndex] = updatedPoll;
                         this.selectedPoll = this.polls[pollToUpdateIndex];
                     });
                     this.pollsService.pollDeleted.subscribe((deletedPoll: Poll) => {
                         _.remove(this.polls, o => o._id === deletedPoll._id);
                         this.selectedPoll = this.polls[0];
                     })
                 }
    
    ngOnInit() {
        this.pollsService.getAllPolls().then(res => {
            this.polls = res;
            let selectedPollID = this.routeParams.get('pollid');
            if (selectedPollID) this.selectedPoll = _.find(this.polls, poll => poll._id === selectedPollID);
            let userFilter = this.routeParams.get('user');
            if (userFilter) this.polls = this.polls.filter(poll => poll.creator === userFilter);
        });
    }

    setPollClass(poll: Poll) {
        return {
            "poll": true,
            "selected": poll === this.selectedPoll
        }
    }

    selectPoll(pollClicked: Poll) {
        this.selectedPoll = pollClicked;
        //this.router.navigate(['PollContainer', {pollid: this.selectedPoll._id}]);
        this.location.go(`/?pollid=${this.selectedPoll._id}`);
    }

}