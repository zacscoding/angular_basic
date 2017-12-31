"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core"); // 애플리케이션 실행에 필요한 패키지 로드
var core_2 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// 컴포넌트 선언
var HelloWorldComponent = (function () {
    function HelloWorldComponent() {
        this.name = 'Angular'; // name 프로퍼티 초기 값 할당
    }
    HelloWorldComponent = __decorate([
        core_1.Component({
            selector: 'hello-world',
            template: '<h1>Hello {{name}}!</h1>' // 컴포넌트가 렌더링 될 HTML 마크업은 template 항목에 정의
        })
    ], HelloWorldComponent);
    return HelloWorldComponent;
}());
// 모듈 선언
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [HelloWorldComponent],
            bootstrap: [HelloWorldComponent]
        })
    ], AppModule);
    return AppModule;
}()); // 모듈로 사용할 클래스 선언
exports.AppModule = AppModule;
// 부트스트랩
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule); // 모듈을 브라우저에 로드
