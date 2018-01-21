"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var application_component_1 = require("./components/application/application.component");
var carousel_component_1 = require("./components/carousel/carousel.component");
var footer_component_1 = require("./components/footer/footer.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var product_item_component_1 = require("./components/product-item/product-item.component");
var search_component_1 = require("./components/search/search.component");
var stars_component_1 = require("./components/stars/stars.component");
var product_service_1 = require("./services/product.service");
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var product_detail_component_1 = require("./components/product-detail/product-detail.component");
var common_1 = require("@angular/common");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot([
                    { path: '', component: home_component_1.default },
                    { path: 'products/:prodTitle', component: product_detail_component_1.default }
                ])
            ],
            // 모듈에서 사용하는 컴포넌트 정의
            declarations: [
                application_component_1.default,
                carousel_component_1.default,
                footer_component_1.default,
                navbar_component_1.default,
                home_component_1.default,
                product_detail_component_1.default,
                product_item_component_1.default,
                search_component_1.default,
                stars_component_1.default
            ],
            // ProductService 프로파이더 선언 -> ApplicationComponent에 주입될 때 사용
            providers: [product_service_1.ProductService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [application_component_1.default]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
