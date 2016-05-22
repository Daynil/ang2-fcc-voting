import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {Poll} from "./Poll";
import {ChartService} from "./chart.service";

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div *ngIf="poll" class="poll-details">
            <div id="details-question">{{ poll.question }}</div>
            <div *ngFor="let choice of poll.choices">
            {{ choice.text }}{{ choice.votes }}
            </div>
            <canvas id="choices-chart" height="250" width="250"></canvas>
        </div>
    `,
    providers: [/*ChartService*/]
})
export class PollDetails implements OnInit {
    @Input() poll: Poll;
    @ViewChild('choices-chart') choicesChart: HTMLCanvasElement;
    
    constructor(/*private chartService: ChartService*/) { }
    
    ngOnInit() {
        this.generateChart(this.choicesChart);
    }
    
    generateChart(el: HTMLCanvasElement) {
        //this.chartService.createChart(el);
    }

}