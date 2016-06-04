System.register(["@angular/core", '@angular/router-deprecated', '@angular/http', "./poll-container.component", "./new-poll.component", "./after-auth.component", "./auth.service", "./polls.service"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, http_1, poll_container_component_1, new_poll_component_1, after_auth_component_1, auth_service_1, polls_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (poll_container_component_1_1) {
                poll_container_component_1 = poll_container_component_1_1;
            },
            function (new_poll_component_1_1) {
                new_poll_component_1 = new_poll_component_1_1;
            },
            function (after_auth_component_1_1) {
                after_auth_component_1 = after_auth_component_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (polls_service_1_1) {
                polls_service_1 = polls_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(authService, router) {
                    this.authService = authService;
                    this.router = router;
                    this.loginButton = 'Log In';
                    this.credentials = { loggedIn: false, user: null };
                    this.myPollsFiltering = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.checkLoggedState();
                };
                AppComponent.prototype.checkLoggedState = function () {
                    var _this = this;
                    if (this.credentials)
                        this.checkLoginButton();
                    this.authService.checkLoggedState()
                        .then(function (creds) {
                        _this.credentials = creds;
                        _this.checkLoginButton();
                    });
                };
                AppComponent.prototype.checkLoginButton = function () {
                    if (this.credentials.loggedIn) {
                        this.loginButton = 'Log Out';
                    }
                    else {
                        this.loginButton = 'Log In';
                    }
                };
                AppComponent.prototype.handleLogging = function () {
                    var _this = this;
                    this.authService.handleAuthLogging().then(function (res) { return _this.checkLoggedState(); });
                };
                AppComponent.prototype.navHome = function () {
                    if (!this.router.isRouteActive(this.router.generate(['PollContainer']))) {
                        this.myPollsFiltering = false;
                        this.router.navigate(['PollContainer']);
                    }
                    else if (this.myPollsFiltering) {
                        this.myPollsFiltering = false;
                        this.router.navigate(['PollContainer']);
                    }
                };
                AppComponent.prototype.navMyPolls = function () {
                    if (!this.router.isRouteActive(this.router.generate(['PollContainer']))) {
                        this.myPollsFiltering = true;
                        this.router.navigate(['PollContainer', { user: this.credentials.user.githubID }]);
                    }
                    else if (!this.myPollsFiltering) {
                        this.myPollsFiltering = true;
                        this.router.navigate(['PollContainer', { user: this.credentials.user.githubID }]);
                    }
                };
                AppComponent.prototype.setButtonClass = function (button) {
                    var inactiveButton = { "button": true, "active-button": false };
                    var activeButton = { "button": false, "active-button": true };
                    switch (button) {
                        case 'home':
                            if (this.router.isRouteActive(this.router.generate(['PollContainer']))
                                && !this.myPollsFiltering)
                                return activeButton;
                            else
                                return inactiveButton;
                        case 'my-polls':
                            if (this.router.isRouteActive(this.router.generate(['PollContainer']))
                                && this.myPollsFiltering)
                                return activeButton;
                            else
                                return inactiveButton;
                        case 'new-poll':
                            if (this.router.isRouteActive(this.router.generate(['NewPoll'])))
                                return activeButton;
                            else
                                return inactiveButton;
                        default:
                            return inactiveButton;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['../css/app.css'],
                        template: "\n\t\t<div id=\"wrapper\">\n\t\t\t<div id=\"header\">\n\t\t\t\t<div id=\"title\">\n\t\t\t\t\t<h1>FCC Voting App</h1>\n\t\t\t\t\t<div id=\"foot\">\n\t\t\t\t\t\t<a id=\"gh-link\" href=\"https://github.com/Daynil/recipe-box\">\n\t\t\t\t\t\t\t<i className=\"fa fa-github-square fa-lg\"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div id=\"foot-text\">\n\t\t\t\t\t\t\tBy <a href=\"https://github.com/Daynil/\">Daynil</a> for <a href=\"http://www.freecodecamp.com/\">FCC</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"menu\">\n\t\t\t\t\t<div [ngClass]=\"setButtonClass('home')\" (click)=\"navHome()\">Home</div>\n\t\t\t\t\t<div [ngClass]=\"setButtonClass('my-polls')\" (click)=\"navMyPolls()\" *ngIf=\"credentials.loggedIn\">My Polls</div>\n\t\t\t\t\t<a [routerLink]=\"['NewPoll']\"><div [ngClass]=\"setButtonClass('new-poll')\" *ngIf=\"credentials.loggedIn\">New Poll</div></a>\n\t\t\t\t\t<div class=\"button\" (click)=\"handleLogging()\">\n\t\t\t\t\t\t<div *ngIf=\"credentials.loggedIn\">{{credentials.user.username}}</div>\n\t\t\t\t\t\t<div>{{loginButton}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<router-outlet></router-outlet>\n\t\t</div>\n\t",
                        directives: [poll_container_component_1.PollContainer, router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, auth_service_1.AuthService, polls_service_1.PollsService]
                    }),
                    router_deprecated_1.RouteConfig([
                        {
                            path: '/',
                            name: 'PollContainer',
                            component: poll_container_component_1.PollContainer
                        },
                        {
                            path: '/new-poll',
                            name: 'NewPoll',
                            component: new_poll_component_1.NewPoll
                        },
                        {
                            path: '/after-auth',
                            name: 'AfterAuth',
                            component: after_auth_component_1.AfterAuth
                        }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_deprecated_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
