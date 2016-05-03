System.register(["angular2/core", "./poll-container.component"], function(exports_1, context_1) {
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
    var core_1, poll_container_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (poll_container_component_1_1) {
                poll_container_component_1 = poll_container_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.loginButton = 'Log In';
                }
                AppComponent.prototype.handleLogging = function () {
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['../css/app.css'],
                        template: "\n\t\t<div id=\"wrapper\">\n\t\t\t<div id=\"header\">\n\t\t\t\t<h1>FCC Voting App</h1>\n\t\t\t\t<div id=\"menu\">\n\t\t\t\t\t<div class=\"button\">Home</div>\n\t\t\t\t\t<div class=\"button\">New Poll</div>\n\t\t\t\t\t<div class=\"button\" (click)=\"handleLogging()\">{{ loginButton }}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<poll-container></poll-container>\n\t\t</div>\n\t",
                        directives: [poll_container_component_1.PollContainer]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
