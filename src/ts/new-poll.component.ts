import {Component, OnInit} from "@angular/core";
import {PollsService} from "./polls.service";
import {AuthService} from "./auth.service";
import {Poll} from "./Poll";
import {User} from "./User";

@Component({
    selector: 'new-poll',
    styleUrls: ['../css/app.css'],
    template: `
        <div id="new-poll">
            <h1>Create a new poll!</h1>
            <p>Question: </p>
            <input type="text" id="new-question" #newquestion>
            <p>Choices (comma separated): </p>
            <input type="text" id="new-choices" #newchoices><br/>
            <div class="button" (click)="createPoll(newquestion.value, newchoices.value)">Create</div>
        </div>
    `
})
export class NewPoll implements OnInit {
    user: User;
    
    constructor(private pollsService: PollsService,
                private authService: AuthService) { }
                
    ngOnInit() {
        this.authService.checkLoggedState().then(res => {
            this.user = res.user;
        });
    }
    
    createPoll(question: string, choices: string) {
        let newPoll: Poll = {};
        newPoll.creator = this.user.githubID;
        newPoll.question = question;
        newPoll.choices = [];
        choices.split(',').forEach(choice => {
            let choiceObj = {
                text: choice.trim(),
                votes: 0
            };
            newPoll.choices.push(choiceObj);
        });
        this.pollsService.createPoll(newPoll).then(res => console.log(res));
    }
}