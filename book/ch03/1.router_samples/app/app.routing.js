"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes와 RouterModule을 불러옴
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var product_component_1 = require("./components/product.component");
var routes = [
    // 기본 URL이면 HomeComponent를 렌더링
    { path: '', component: home_component_1.HomeComponent },
    // 기본 URL 뒤에 product 주소가 붙으면, ProductDetailComponent를 렌더링
    { path: 'product', component: product_component_1.ProductDetailComponent }
];
// 라우터 설정을 모듈 외부로 공개해서 루트 모듈에서 사용할 수 있또록 함.
exports.routing = router_1.RouterModule.forRoot(routes);
