System.register(["@angular/core", "@angular/http", "rxjs/Observable"], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                }
                AuthService.prototype.parseData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error("Response status: " + res.status);
                    }
                    var body = res.json();
                    return body;
                };
                AuthService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.log(errMsg);
                    return Observable_1.Observable.throw(errMsg);
                };
                AuthService.prototype.checkLoggedState = function () {
                    return this.http
                        .get('/auth/checkCreds')
                        .toPromise()
                        .then(this.parseData)
                        .catch(this.handleError);
                };
                AuthService.prototype.handleAuthLogging = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.checkLoggedState().then(function (res) {
                            if (!res.loggedIn) {
                                var oauthWindow_1 = window.open('http://localhost:3000/auth/github', 'OAuthConnect', 'location=0,status=0,width=800,height=400');
                                var oauthInterval_1 = window.setInterval(function () {
                                    if (oauthWindow_1.closed) {
                                        window.clearInterval(oauthInterval_1);
                                        resolve();
                                    }
                                }, 1000);
                            }
                            else {
                                _this.http.get('/auth/logout').subscribe(function (res) { return resolve(); });
                            }
                        });
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});

//# sourceMappingURL=auth.service.js.map