import {Component, Input, Output, EventEmitter,
        ViewChild, AfterViewInit, ElementRef, OnChanges, OnInit} from "@angular/core";
import {Poll} from "./Poll";
import {ChartService} from "./chart.service";
import {PollsService} from "./polls.service";
import {AuthService} from "./auth.service";
import {Credentials} from "./User";

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div class="poll-details">
            <div id="details-question">{{ poll.question }}</div>
            <select name="pollChoices" #choiceSelect>
                <option *ngFor="let choice of poll.choices" [value]="choice.text">{{ choice.text }}</option>
            </select>
            <div class="button" id="vote-button" (click)="submitVote(choiceSelect)">Vote</div>
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
    @Output() onVoted = new EventEmitter<boolean>();
    
    @ViewChild('choicesChart') choicesChart: ElementRef;
    
    creds: Credentials;
    breadcrumbText: string = null;
    
    constructor(private chartService: ChartService,
                private pollsService: PollsService,
                private authService: AuthService) { }
                
    ngOnInit() {
        this.authService.checkLoggedState().then(res => this.creds = res);
    }
    
    ngAfterViewInit() {
        this.generateChart(this.choicesChart.nativeElement);
    }
    
    ngOnChanges(changes) {
        if (this.choicesChart) this.chartService.nextChart(this.choicesChart.nativeElement, this.poll.choices);
    }
        
    generateChart(el: HTMLCanvasElement) {
        this.chartService.createChart(el, this.poll.choices);
    }
    
    submitVote(choiceSelect) {
        this.pollsService.submitVote(this.poll, choiceSelect.value)
            .then(res => {
                this.poll = res.poll;
                this.chartService.updateChart(this.poll.choices);
                this.breadcrumb(`Voted for ${choiceSelect.value}`);
            });
    }
    
    breadcrumb(text: string) {
        this.breadcrumbText = text;
        window.setTimeout(() => this.breadcrumbText = null, 2000);
    }

}