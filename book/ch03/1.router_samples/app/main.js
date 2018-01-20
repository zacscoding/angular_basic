"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./components/app.component");
var home_component_1 = require("./components/home.component");
var product_component_1 = require("./components/product.component");
var common_1 = require("@angular/common");
// 라우터 설정을 불러옴
var app_routing_1 = require("./app.routing");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            // NgModule에 라우터 설정 추가
            imports: [platform_browser_1.BrowserModule,
                app_routing_1.routing],
            declarations: [app_component_1.AppComponent,
                home_component_1.HomeComponent,
                product_component_1.ProductDetailComponent],
            // HashLocationStrategy 방식을 사용하도록 프로바이더를 설정
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
// 애플리케이션을 시작
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
