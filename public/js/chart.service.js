System.register(["@angular/core", "lodash"], function(exports_1, context_1) {
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
    var core_1, _;
    var ChartService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            ChartService = (function () {
                function ChartService() {
                    this.colorList = [
                        '#C0392B', '#9B59B6', '#2980B9', '#1ABC9C', '#27AE60',
                        '#F1C40F', '#E67E22', '#95A5A6', '#34495E', '#E6B0AA',
                        '#D7BDE2', '#A9CCE3', '#A3E4D7', '#F9E79F', '#EDBB99'
                    ];
                }
                ChartService.prototype.randomColor = function () {
                    var randR = _.random(0, 255, false);
                    var randG = _.random(0, 255, false);
                    var randB = _.random(0, 255, false);
                    return "rgb(" + randR + ", " + randG + ", " + randB + ")";
                };
                ChartService.prototype.createChart = function (el, choicesList) {
                    var _this = this;
                    var ctx = el.getContext("2d");
                    var fullData = {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                backgroundColor: [],
                                hoverBackgroundColor: []
                            }]
                    };
                    choicesList.forEach(function (choice, i, arr) {
                        fullData.labels.push(choice.text);
                        fullData.datasets[0].data.push(choice.votes);
                        var nextColor = _this.colorList[i % _this.colorList.length];
                        fullData.datasets[0].backgroundColor.push(nextColor);
                        fullData.datasets[0].hoverBackgroundColor.push(nextColor);
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
                    // Check for newly added custom choice
                    if (choicesList.length !== this.currentChart.data.labels.length) {
                        this.currentChart.data.labels.push(choicesList[choicesList.length - 1].text);
                        var nextColor = this.colorList[choicesList.length - 1 % this.colorList.length];
                        this.currentChart.data.datasets[0].backgroundColor.push(nextColor);
                        this.currentChart.data.datasets[0].hoverBackgroundColor.push(nextColor);
                    }
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
