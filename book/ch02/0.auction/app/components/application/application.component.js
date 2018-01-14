"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// ApplicationComponent 클래스에 @Component 어노테이션을 붙여서 Angular 컴포넌트로 만듬
var ApplicationComponent = /** @class */ (function () {
    // 클래스 생성자에 인자로 ProductService를 전달하면 Angular가 적당한 프로바이더를 찾아서 의존성으로 주입
    function ApplicationComponent(productService) {
        this.productService = productService;
        // 제네릭을 사용해서 Product 타입의 배열을 클래스 멤버 변수 products에 선언
        this.products = [];
        // 상품의 목록을 받아서 products 프로퍼티에 할당. 컴포넌트 프로퍼티는 데이터 바인딩을 사용해서
        // 화면에 표시할 수 있음
        this.products = this.productService.getProducts();
    }
    ApplicationComponent = __decorate([
        core_1.Component({
            // selector는 index.html 파일에 이 컴포넌트가 사용될 위치를 지정
            selector: 'auction-application',
            // HTML 템플릿은 application.component.html 파일로 지정
            templateUrl: 'app/components/application/application.component.html',
            // CSS는 application.component.css 파일로 지정
            styleUrls: ['app/components/application/application.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
        // ApplicationComponent는 다른 클래스인 AppModule에서 사용되기 때문에 모듈 외부로 공개
    ], ApplicationComponent);
    return ApplicationComponent;
}());
exports.default = ApplicationComponent;
