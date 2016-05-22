import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {Poll} from "./Poll";
import {ChartService} from "./chart.service";

@Component({
    selector: 'poll-details',
    styleUrls: ['../css/app.css'],
    template: `
        <div class="poll-details">
            <div id="details-question">{{ poll.question }}</div>
            <div *ngFor="let choice of poll.choices">
            {{ choice.text }}{{ choice.votes }}
            </div>
            <canvas #choicesChart id="choices-chart" height="250" width="250"></canvas>
        </div>
    `,
    providers: [ChartService]
})
export class PollDetails implements OnInit {
    @Input() poll: Poll;
    @ViewChild('choicesChart') choicesChart: HTMLCanvasElement;
    
    constructor(private chartService: ChartService) { }
    
    ngOnInit() {
        //this.generateChart(this.choicesChart);
        console.log('viewchild method: ', this.choicesChart);
        console.log('standard method: ', document.getElementById('choices-chart'));
    }
        
    generateChart(el: HTMLCanvasElement) {
        this.chartService.createChart(el);
    }

}