import {Component} from "@angular/core";

@Component({
    selector: 'new-poll',
    styleUrls: ['../css/app.css'],
    template: `
        <div id="new-poll">
            <h1>Create a new poll!</h1>
            <p>Question: </p>
            <input type="text" id="new-question">
            <p>Choices (comma separated): </p>
            <input type="text" id="new-choices"><br/>
            <div class="button">Create</div>
        </div>
    `
})
export class NewPoll {
    constructor() { }
}