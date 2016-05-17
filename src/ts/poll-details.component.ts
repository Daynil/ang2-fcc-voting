import {Component, Input} from "@angular/core";
import {Poll} from "./Poll";

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div *ngIf="poll" class="poll-details">
            <div>{{ poll.question }}</div>
            <div *ngFor="let choice of poll.choices">
            {{ choice.text }}{{ choice.votes }}
            </div>
        </div>
    `
})
export class PollDetails {
    @Input()
    poll: Poll;
    
    constructor() { }

}