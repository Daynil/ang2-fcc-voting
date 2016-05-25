import {Injectable} from "@angular/core";
import {Choice} from "./Poll";

// Suppress typescript for chartjs, typings not working properly
declare var Chart: any;

@Injectable()
export class ChartService {
	
	currentChart;
	
	constructor() { }
	
	createChart(el: HTMLCanvasElement, choicesList: Choice[]) {
		let ctx = el.getContext("2d");
		let fullData = {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}]
		};
		choicesList.forEach(choice => {
			fullData.labels.push(choice.text);
			fullData.datasets[0].data.push(choice.votes);
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
}

