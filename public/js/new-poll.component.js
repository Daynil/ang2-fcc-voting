System.register(["@angular/core", "@angular/router-deprecated", "./polls.service", "./auth.service"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, polls_service_1, auth_service_1;
    var NewPoll;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (polls_service_1_1) {
                polls_service_1 = polls_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            NewPoll = (function () {
                function NewPoll(pollsService, authService, router) {
                    this.pollsService = pollsService;
                    this.authService = authService;
                    this.router = router;
                }
                NewPoll.prototype.ngOnInit = function () {
                    var _this = this;
                    this.authService.checkLoggedState().then(function (res) {
                        _this.user = res.user;
                    });
                };
                NewPoll.prototype.createPoll = function (question, choices) {
                    var _this = this;
                    if (question === '' || choices === '')
                        return;
                    var newPoll = {};
                    newPoll.creator = this.user.githubID;
                    newPoll.question = question;
                    newPoll.choices = [];
                    choices.split(',').forEach(function (choice) {
                        var choiceObj = {
                            text: choice.trim(),
                            votes: 0
                        };
                        newPoll.choices.push(choiceObj);
                    });
                    this.pollsService
                        .createPoll(newPoll)
                        .then(function (poll) {
                        _this.router.navigate(['PollContainer', { pollid: poll._id }]);
                    });
                };
                NewPoll = __decorate([
                    core_1.Component({
                        selector: 'new-poll',
                        styleUrls: ['../css/app.css'],
                        template: "\n        <div id=\"new-poll\">\n            <h1>Create a new poll!</h1>\n            <p>Question: </p>\n            <input type=\"text\" id=\"new-question\" #newquestion>\n            <p>Choices (comma separated): </p>\n            <input type=\"text\" id=\"new-choices\" #newchoices><br/>\n            <div class=\"button\" (click)=\"createPoll(newquestion.value, newchoices.value)\">Create</div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [polls_service_1.PollsService, auth_service_1.AuthService, router_deprecated_1.Router])
                ], NewPoll);
                return NewPoll;
            }());
            exports_1("NewPoll", NewPoll);
        }
    }
});

//# sourceMappingURL=new-poll.component.js.map
