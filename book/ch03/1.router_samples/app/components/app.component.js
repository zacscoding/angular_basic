"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <a [routerLink]=\"['/']\">Home</a>\n        <a [routerLink]=\"['/product']\">Product Details</a>\n        <router-outlet></router-outlet>\n    "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// 기본 주소로 이동하는 링크를 만듬
// /product 주소로 이동하는 링크를 만듬
// 컴포넌트를 렌더링할 위치는 <router-outlet> 태그로 지정
// [routerLink] :: 프로퍼티 바인딩 && ['/product'] :: routerLink 프로퍼티에 /product 주소와 연결되는 컴포넌트를 바인딩
// => <router-outlet> 태그가 사용된 곳에 렌더링 
