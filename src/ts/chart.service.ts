import {Injectable} from "@angular/core";
import {Choice} from "./Poll";
import * as _ from "lodash";

// Suppress typescript for chartjs, typings not working properly
declare var Chart: any;

@Injectable()
export class ChartService {
	
	currentChart;
	
	colorList = [
		'#C0392B', '#9B59B6', '#2980B9', '#1ABC9C', '#27AE60',
		'#F1C40F', '#E67E22', '#95A5A6', '#34495E', '#E6B0AA',
		'#D7BDE2', '#A9CCE3', '#A3E4D7', '#F9E79F', '#EDBB99'
	]
	
	constructor() { }
	
	randomColor() {
		let randR = _.random(0, 255, false);
		let randG = _.random(0, 255, false);
		let randB = _.random(0, 255, false);
		return `rgb(${randR}, ${randG}, ${randB})`;
	}
	
	createChart(el: HTMLCanvasElement, choicesList: Choice[]) {
		let ctx = el.getContext("2d");
		let fullData = {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: [],
					hoverBackgroundColor: []
				}]
		};
		choicesList.forEach((choice, i, arr) => {
			fullData.labels.push(choice.text);
			fullData.datasets[0].data.push(choice.votes);
			let nextColor = this.colorList[i % this.colorList.length];
			fullData.datasets[0].backgroundColor.push(nextColor);
			fullData.datasets[0].hoverBackgroundColor.push(nextColor);
		});
		console.log(fullData);
		this.currentChart = new Chart(ctx, {
			type: 'doughnut',
			data: fullData
		});
	}
	
	nextChart(el: HTMLCanvasElement, choicesList: Choice[]) {
		this.currentChart.destroy();
		this.createChart(el, choicesList);
	}
	
	updateChart(choicesList: Choice[]) {
		this.currentChart.data.datasets[0].data = choicesList.map(choice => choice.votes);
		
		// Check for newly added custom choice
		if (choicesList.length !== this.currentChart.data.labels.length) {
			this.currentChart.data.labels.push(choicesList[choicesList.length-1].text);
			let nextColor = this.colorList[choicesList.length-1 % this.colorList.length];
			this.currentChart.data.datasets[0].backgroundColor.push(nextColor);
			this.currentChart.data.datasets[0].hoverBackgroundColor.push(nextColor);
		}
		this.currentChart.update();
	}
}

