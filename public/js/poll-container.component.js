System.register(["@angular/core", "@angular/common", "@angular/router-deprecated", 'lodash', "./poll-details.component", "./polls.service"], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, _, poll_details_component_1, polls_service_1;
    var PollContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (poll_details_component_1_1) {
                poll_details_component_1 = poll_details_component_1_1;
            },
            function (polls_service_1_1) {
                polls_service_1 = polls_service_1_1;
            }],
        execute: function() {
            PollContainer = (function () {
                function PollContainer(pollsService, router, routeParams, location) {
                    var _this = this;
                    this.pollsService = pollsService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.location = location;
                    this.polls = [];
                    this.selectedPoll = null;
                    this.pollsService.pollUpdated.subscribe(function (updatedPoll) {
                        var pollToUpdateIndex = _this.polls.indexOf(_.find(_this.polls, function (o) { return o._id === updatedPoll._id; }));
                        _this.polls[pollToUpdateIndex] = updatedPoll;
                        _this.selectedPoll = _this.polls[pollToUpdateIndex];
                    });
                }
                PollContainer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.pollsService.getAllPolls().then(function (res) {
                        _this.polls = res;
                        var selectedPollID = _this.routeParams.get('pollid');
                        if (selectedPollID)
                            _this.selectedPoll = _.find(_this.polls, function (poll) { return poll._id === selectedPollID; });
                        var userFilter = _this.routeParams.get('user');
                        if (userFilter)
                            _this.polls = _this.polls.filter(function (poll) { return poll.creator === userFilter; });
                    });
                };
                PollContainer.prototype.setPollClass = function (poll) {
                    return {
                        "poll": true,
                        "selected": poll === this.selectedPoll
                    };
                };
                PollContainer.prototype.selectPoll = function (pollClicked) {
                    this.selectedPoll = pollClicked;
                    //this.router.navigate(['PollContainer', {pollid: this.selectedPoll._id}]);
                    this.location.go("/?pollid=" + this.selectedPoll._id);
                };
                PollContainer = __decorate([
                    core_1.Component({
                        selector: 'poll-container',
                        styleUrls: ['../css/app.css'],
                        template: "\n        <div class=\"poll-wrapper\">\n            <div id=\"poll-list\" [ngClass]=\"{'show-details': (selectedPoll !== null)}\">\n                <div *ngFor=\"let poll of polls\" [ngClass]=\"setPollClass(poll)\" (click)=\"selectPoll(poll)\">\n                    {{ poll.question }}\n                </div>\n            </div>\n            <poll-details *ngIf=\"selectedPoll\" [poll]=\"selectedPoll\"></poll-details>\n        </div>\n    ",
                        directives: [poll_details_component_1.PollDetails]
                    }), 
                    __metadata('design:paramtypes', [polls_service_1.PollsService, router_deprecated_1.Router, router_deprecated_1.RouteParams, common_1.Location])
                ], PollContainer);
                return PollContainer;
            }());
            exports_1("PollContainer", PollContainer);
        }
    }
});

//# sourceMappingURL=poll-container.component.js.map
