import {Component, Input} from "angular2/core";
import {Poll} from "./Poll";

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div *ngIf="poll" class="poll-details">
            {{ poll.name }}
        </div>
    `
})
export class PollDetails {
    @Input()
    poll: Poll;
    
    constructor() { }

}