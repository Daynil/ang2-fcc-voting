import {Injectable} from "@angular/core";
import "chart";

@Injectable()
export class ChartService {
	
	constructor() { }
	
	createChart(el: HTMLCanvasElement, data?: number[]): CircularInstance {
		let ctx = el.getContext("2d");
		let fullData: CircularChartData[] = [
			{
				value: 300,
				color: '#ff6384',
				highlight: '#ff6384',
				label: 'Red'
			},
			{
				value: 50,
				color: '#36a2eb',
				highlight: '#36a2eb',
				label: 'Green'
			},
			{
				value: 100,
				color: '#ffce56',
				highlight: '#ffce56',
				label: 'Yellow'
			}
		];
		let chart = new Chart(ctx).Doughnut;
		return chart(fullData);
	}
}