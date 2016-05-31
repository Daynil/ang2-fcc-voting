import {Component, Input, Output, EventEmitter,
        ViewChild, AfterViewInit, ElementRef, 
        OnChanges, OnInit} from "@angular/core";
import {Poll, Choice} from "./Poll";
import {ChartService} from "./chart.service";
import {PollsService} from "./polls.service";
import {AuthService} from "./auth.service";
import {Credentials} from "./User";
import * as _ from 'lodash';

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div class="poll-details">
            <div id="details-question">{{ poll.question }}</div>
            <select name="pollChoices" #choiceSelect (change)="checkCustomRequest(choiceSelect.value)">
                <option *ngFor="let choice of displayChoices" [value]="choice.text">{{ choice.text }}</option>
            </select>
            <div class="button" id="vote-button" (click)="submitVote(choiceSelect.value)">Vote</div>
            <input id="user-choice" *ngIf="customRequest" #userChoice placeHolder="Custom choice...">
            <div height="300" width="300">
                <canvas #choicesChart id="choices-chart"></canvas>
            </div>
            <div class="breadcrumb" *ngIf="breadcrumbText">{{ breadcrumbText }}</div>
        </div>
    `,
    providers: [ChartService]
})
export class PollDetails implements AfterViewInit, OnChanges, OnInit {
    @Input() poll: Poll;
    
    @ViewChild('choicesChart') choicesChart: ElementRef;
    @ViewChild('userChoice') userChoice: ElementRef;
    
    creds: Credentials;
    breadcrumbText: string = null;
    displayChoices: Choice[];
    customChoice = {
                       text: "I'd like a custom choice",
                       votes: 0
                   };
    customRequest = false;
    
    constructor(private chartService: ChartService,
                private pollsService: PollsService,
                private authService: AuthService) {
                    this.authService.loginEvent.subscribe(creds => this.onLoginEvent(creds));
                }
                
    ngOnInit() {
        this.displayChoices = this.poll.choices.slice();
        this.authService.checkLoggedState().then(res => {
            this.creds = res;
            if (this.creds.loggedIn) {
                this.adjustDisplayChoices(this.creds.loggedIn);
            }
        });
    }
    
    ngAfterViewInit() {
        this.generateChart(this.choicesChart.nativeElement);
    }
    
    ngOnChanges(changes) {
        if (this.creds) this.adjustDisplayChoices(this.creds.loggedIn);
        if (this.choicesChart) this.chartService.nextChart(this.choicesChart.nativeElement, this.poll.choices);
    }
    
    onLoginEvent(creds: Credentials) {
        this.creds = creds;
        this.adjustDisplayChoices(creds.loggedIn);
    }
    
    adjustDisplayChoices(loggedIn: boolean) {
        this.displayChoices = this.poll.choices.slice();
        if (loggedIn) {
            this.displayChoices.push(this.customChoice);
        }
    }
        
    generateChart(el: HTMLCanvasElement) {
        this.chartService.createChart(el, this.poll.choices);
    }
    
    checkCustomRequest(selectedChoice: string) {
        if (selectedChoice === this.customChoice.text) this.customRequest = true;
        else this.customRequest = false;
    }
    
    submitVote(existingChoice: string) {
        let choiceSelection = existingChoice;
        if (this.customRequest) {
            let customChoiceText = this.userChoice.nativeElement.value;
            if (customChoiceText.length < 1) return;
            else {
                choiceSelection = customChoiceText;
                this.userChoice.nativeElement.value = '';
            }
        }
        this.pollsService.submitVote(this.poll, choiceSelection)
            .then(res => {
                this.poll = res.poll;
                this.chartService.updateChart(this.poll.choices);
                this.breadcrumb(`Voted for ${choiceSelection}`);
            });
    }
    
    breadcrumb(text: string) {
        this.breadcrumbText = text;
        window.setTimeout(() => this.breadcrumbText = null, 2000);
    }

}