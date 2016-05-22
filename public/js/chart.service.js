System.register(["@angular/core", "chart"], function(exports_1, context_1) {
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
            },
            function (_1) {}],
        execute: function() {
            ChartService = (function () {
                function ChartService() {
                }
                ChartService.prototype.createChart = function (el, data) {
                    var ctx = el.getContext("2d");
                    var fullData = [
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
                    var chart = new Chart(ctx).Doughnut;
                    return chart(fullData);
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
