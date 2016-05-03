System.register(["angular2/core", 'lodash', "./poll-details.component"], function(exports_1, context_1) {
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
    var core_1, _, poll_details_component_1;
    var PollContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (poll_details_component_1_1) {
                poll_details_component_1 = poll_details_component_1_1;
            }],
        execute: function() {
            PollContainer = (function () {
                function PollContainer() {
                    this.polls = [];
                    this.selectedPoll = null;
                    for (var i = 0; i < 10; i++) {
                        this.polls.push({
                            name: _.random(100, 999)
                        });
                    }
                }
                PollContainer.prototype.setPollClass = function (poll) {
                    return {
                        "poll": true,
                        "selected": poll === this.selectedPoll
                    };
                };
                PollContainer.prototype.selectPoll = function (pollClicked) {
                    this.selectedPoll = pollClicked;
                };
                PollContainer = __decorate([
                    core_1.Component({
                        selector: 'poll-container',
                        styleUrls: ['../css/app.css'],
                        template: "\n        <div class=\"poll-wrapper\">\n            <div id=\"poll-list\" [ngClass]=\"{'show-details': (selectedPoll !== null)}\">\n                <div *ngFor=\"let poll of polls\" [ngClass]=\"setPollClass(poll)\" (click)=\"selectPoll(poll)\">\n                    {{ poll.name }}\n                </div>\n            </div>\n            <poll-details [poll]=\"selectedPoll\"></poll-details>\n        </div>\n    ",
                        directives: [poll_details_component_1.PollDetails]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PollContainer);
                return PollContainer;
            }());
            exports_1("PollContainer", PollContainer);
        }
    }
});

//# sourceMappingURL=poll-container.component.js.map
