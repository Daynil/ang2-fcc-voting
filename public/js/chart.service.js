System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ChartService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ChartService = (function () {
                function ChartService() {
                }
                ChartService.prototype.createChart = function (el, choicesList) {
                    var ctx = el.getContext("2d");
                    var fullData = {
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
                    choicesList.forEach(function (choice) {
                        fullData.labels.push(choice.text);
                        fullData.datasets[0].data.push(choice.votes);
                    });
                    console.log(fullData);
                    this.currentChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: fullData
                    });
                };
                ChartService.prototype.nextChart = function (el, choicesList) {
                    this.currentChart.destroy();
                    this.createChart(el, choicesList);
                };
                ChartService.prototype.updateChart = function (choicesList) {
                    this.currentChart.data.datasets[0].data = choicesList.map(function (choice) { return choice.votes; });
                    this.currentChart.update();
                };
                ChartService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ChartService);
                return ChartService;
            }());
            exports_1("ChartService", ChartService);
        }
    }
});

//# sourceMappingURL=chart.service.js.map
