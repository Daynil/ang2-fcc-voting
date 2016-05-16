/// <reference path="../../node_modules/angular2-in-memory-web-api/typings/browser.d.ts" />
System.register(['@angular/platform-browser-dynamic', './app.component', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent);
        }
    }
});

//# sourceMappingURL=main.js.map
