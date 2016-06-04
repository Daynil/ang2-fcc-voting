System.register(["@angular/core", "@angular/common", "./chart.service", "./polls.service", "./auth.service"], function(exports_1, context_1) {
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
    var core_1, common_1, chart_service_1, polls_service_1, auth_service_1;
    var PollDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (chart_service_1_1) {
                chart_service_1 = chart_service_1_1;
            },
            function (polls_service_1_1) {
                polls_service_1 = polls_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            PollDetails = (function () {
                function PollDetails(chartService, pollsService, authService, location) {
                    var _this = this;
                    this.chartService = chartService;
                    this.pollsService = pollsService;
                    this.authService = authService;
                    this.location = location;
                    this.creds = { user: null, loggedIn: false, ownPoll: false };
                    this.breadcrumbText = null;
                    this.customChoice = {
                        text: "I'd like a custom choice",
                        votes: 0
                    };
                    this.customRequest = false;
                    this.authService.loginEvent.subscribe(function (creds) { return _this.onLoginEvent(creds); });
                }
                PollDetails.prototype.ngOnInit = function () {
                    var _this = this;
                    this.displayChoices = this.poll.choices.slice();
                    this.authService.checkLoggedState().then(function (res) {
                        _this.creds = res;
                        if (_this.creds.loggedIn) {
                            _this.adjustDisplayChoices(_this.creds.loggedIn);
                            _this.creds.ownPoll = _this.creds.user.githubID === _this.poll.creator;
                        }
                    });
                };
                PollDetails.prototype.ngAfterViewInit = function () {
                    this.generateChart(this.choicesChart.nativeElement);
                };
                PollDetails.prototype.ngOnChanges = function (changes) {
                    if (this.creds.user) {
                        this.adjustDisplayChoices(this.creds.loggedIn);
                        this.creds.ownPoll = this.creds.user.githubID === this.poll.creator;
                    }
                    if (this.choicesChart)
                        this.chartService.nextChart(this.choicesChart.nativeElement, this.poll.choices);
                };
                PollDetails.prototype.onLoginEvent = function (creds) {
                    this.creds = creds;
                    this.adjustDisplayChoices(creds.loggedIn);
                    if (this.creds.user)
                        this.creds.ownPoll = this.creds.user.githubID === this.poll.creator;
                };
                PollDetails.prototype.adjustDisplayChoices = function (loggedIn) {
                    this.displayChoices = this.poll.choices.slice();
                    if (loggedIn) {
                        this.displayChoices.push(this.customChoice);
                    }
                };
                PollDetails.prototype.generateChart = function (el) {
                    this.chartService.createChart(el, this.poll.choices);
                };
                PollDetails.prototype.checkCustomRequest = function (selectedChoice) {
                    if (selectedChoice === this.customChoice.text)
                        this.customRequest = true;
                    else
                        this.customRequest = false;
                };
                PollDetails.prototype.submitVote = function (existingChoice) {
                    var _this = this;
                    var choiceSelection = existingChoice;
                    if (this.customRequest) {
                        var customChoiceText = this.userChoice.nativeElement.value;
                        if (customChoiceText.length < 1)
                            return;
                        else {
                            choiceSelection = customChoiceText;
                            this.userChoice.nativeElement.value = '';
                        }
                    }
                    this.pollsService.submitVote(this.poll, choiceSelection, this.creds.user)
                        .then(function (res) {
                        if (res.duplicate) {
                            _this.breadcrumb("You've already voted for this poll!");
                        }
                        else {
                            _this.poll = res.poll;
                            _this.chartService.updateChart(_this.poll.choices);
                            _this.breadcrumb("Voted for " + choiceSelection);
                        }
                    });
                };
                PollDetails.prototype.deletePoll = function () {
                    if (confirm("Are you sure you want to delete your poll?")) {
                        this.pollsService.deletePoll(this.poll);
                    }
                };
                PollDetails.prototype.breadcrumb = function (text) {
                    var _this = this;
                    this.breadcrumbText = text;
                    window.setTimeout(function () { return _this.breadcrumbText = null; }, 2000);
                };
                PollDetails.prototype.tweetPoll = function () {
                    var tweetText = encodeURIComponent("Vote on my poll: " + this.poll.question);
                    var pollUrl = encodeURIComponent(location.href);
                    var url = "http://twitter.com/share?text=" + tweetText + "&url=" + pollUrl;
                    var width = 575, height = 500, left = (window.innerWidth - width) / 2, top = (window.innerHeight - height) / 2, opts = 'status=1,width=' + width + ',height=' + height + ',top=' + top + 'left=' + left;
                    window.open(url, 'twitter', opts);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PollDetails.prototype, "poll", void 0);
                __decorate([
                    core_1.ViewChild('choicesChart'), 
                    __metadata('design:type', core_1.ElementRef)
                ], PollDetails.prototype, "choicesChart", void 0);
                __decorate([
                    core_1.ViewChild('userChoice'), 
                    __metadata('design:type', core_1.ElementRef)
                ], PollDetails.prototype, "userChoice", void 0);
                PollDetails = __decorate([
                    core_1.Component({
                        selector: 'poll-details',
                        styleUrls: ['../css/app.css'],
                        template: "\n        <div class=\"poll-details\">\n            <div id=\"details-question\">{{ poll.question }}</div>\n            <i *ngIf=\"creds.ownPoll\" id=\"delete-poll\" class=\"fa fa-times-circle\" aria-hidden=\"true\" \n                title=\"Delete My Poll\" (click)=\"deletePoll()\"></i>\n            <select name=\"pollChoices\" #choiceSelect (change)=\"checkCustomRequest(choiceSelect.value)\">\n                <option *ngFor=\"let choice of displayChoices\" [value]=\"choice.text\">{{ choice.text }}</option>\n            </select>\n            <div class=\"button\" id=\"vote-button\" (click)=\"submitVote(choiceSelect.value)\">Vote</div>\n            <input id=\"user-choice\" *ngIf=\"customRequest\" #userChoice placeHolder=\"Custom choice...\">\n            <div height=\"300\" width=\"300\">\n                <canvas #choicesChart id=\"choices-chart\"></canvas>\n            </div>\n            <div class=\"breadcrumb\" *ngIf=\"breadcrumbText\">{{ breadcrumbText }}</div>\n            <span id=\"tweet-button\" (click)=\"tweetPoll()\">\n                <i class=\"fa fa-twitter\"></i>Share Poll\n            </span>\n        </div>\n    ",
                        providers: [chart_service_1.ChartService]
                    }), 
                    __metadata('design:paramtypes', [chart_service_1.ChartService, polls_service_1.PollsService, auth_service_1.AuthService, common_1.Location])
                ], PollDetails);
                return PollDetails;
            }());
            exports_1("PollDetails", PollDetails);
        }
    }
});

//# sourceMappingURL=poll-details.component.js.map
