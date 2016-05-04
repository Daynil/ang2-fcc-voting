System.register(["@angular/core", '@angular/router-deprecated', '@angular/http', "./poll-container.component", "./new-poll.component", "./after-auth.component"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, http_1, poll_container_component_1, new_poll_component_1, after_auth_component_1;
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
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_http) {
                    this._http = _http;
                    this.loginButton = 'Log In';
                }
                AppComponent.prototype.checkLoggedState = function () {
                    var _this = this;
                    this._http.get('/auth/checkCreds')
                        .subscribe(function (res) {
                        var isLoggedIn = res._body;
                        if (isLoggedIn) {
                            console.log('logged in!');
                            _this.loginButton = 'Log Out';
                        }
                    });
                };
                AppComponent.prototype.handleLogging = function () {
                    var _this = this;
                    //TODO refactor oath code into service
                    var oauthWindow = window.open('http://localhost:3000/auth/github', 'OAuthConnect', 'location=0,status=0,width=800,height=400');
                    var oauthInterval = window.setInterval(function () {
                        if (oauthWindow.closed) {
                            window.clearInterval(oauthInterval);
                            _this.checkLoggedState();
                        }
                    }, 1000);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['../css/app.css'],
                        template: "\n\t\t<div id=\"wrapper\">\n\t\t\t<div id=\"header\">\n\t\t\t\t<h1>FCC Voting App</h1>\n\t\t\t\t<div id=\"menu\">\n\t\t\t\t\t<a [routerLink]=\"['PollContainer']\"><div class=\"button\">Home</div></a>\n\t\t\t\t\t<a [routerLink]=\"['NewPoll']\"><div class=\"button\">New Poll</div></a>\n\t\t\t\t\t<div class=\"button\" (click)=\"handleLogging()\">{{loginButton}}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<router-outlet></router-outlet>\n\t\t</div>\n\t",
                        directives: [poll_container_component_1.PollContainer, router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]
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
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
