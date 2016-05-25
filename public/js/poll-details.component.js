System.register(["@angular/core", "./chart.service", "./polls.service"], function(exports_1, context_1) {
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
    var core_1, chart_service_1, polls_service_1;
    var PollDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chart_service_1_1) {
                chart_service_1 = chart_service_1_1;
            },
            function (polls_service_1_1) {
                polls_service_1 = polls_service_1_1;
            }],
        execute: function() {
            PollDetails = (function () {
                function PollDetails(chartService, pollsService) {
                    this.chartService = chartService;
                    this.pollsService = pollsService;
                    this.onVoted = new core_1.EventEmitter();
                }
                PollDetails.prototype.ngAfterViewInit = function () {
                    this.generateChart(this.choicesChart.nativeElement);
                };
                PollDetails.prototype.ngOnChanges = function (changes) {
                    if (this.choicesChart)
                        this.chartService.nextChart(this.choicesChart.nativeElement, this.poll.choices);
                };
                PollDetails.prototype.generateChart = function (el) {
                    this.chartService.createChart(el, this.poll.choices);
                };
                PollDetails.prototype.submitVote = function (choiceSelect) {
                    var _this = this;
                    this.pollsService.submitVote(this.poll, choiceSelect.value)
                        .then(function (res) {
                        _this.poll = res.poll;
                        console.log(_this.poll);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PollDetails.prototype, "poll", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PollDetails.prototype, "onVoted", void 0);
                __decorate([
                    core_1.ViewChild('choicesChart'), 
                    __metadata('design:type', core_1.ElementRef)
                ], PollDetails.prototype, "choicesChart", void 0);
                PollDetails = __decorate([
                    core_1.Component({
                        selector: 'poll-details',
                        styleUrls: ['../css/app.css'],
                        template: "\n        <div class=\"poll-details\">\n            <div id=\"details-question\">{{ poll.question }}</div>\n            <select name=\"pollChoices\" #choiceSelect>\n                <option *ngFor=\"let choice of poll.choices\" [value]=\"choice.text\">{{ choice.text }}</option>\n            </select>\n            <div class=\"button\" id=\"vote-button\" (click)=\"submitVote(choiceSelect)\">Vote</div>\n            <div height=\"300\" width=\"300\">\n                <canvas #choicesChart id=\"choices-chart\"></canvas>\n            </div>\n        </div>\n    ",
                        providers: [chart_service_1.ChartService]
                    }), 
                    __metadata('design:paramtypes', [chart_service_1.ChartService, polls_service_1.PollsService])
                ], PollDetails);
                return PollDetails;
            }());
            exports_1("PollDetails", PollDetails);
        }
    }
});

//# sourceMappingURL=poll-details.component.js.map
