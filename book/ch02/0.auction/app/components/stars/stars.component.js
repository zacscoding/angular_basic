"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core"); // ngOnInit() 함수가 정의 된 OnInit 인터페이스를 불러옴
var StarsComponent = /** @class */ (function () {
    function StarsComponent() {
        // 데이터 바인딩 표현식을 사용해 부모 컴포넌트에서 count와 rating 변수를 설정할 수 있도록 함
        this.count = 5;
        this.rating = 0;
        // 이 배열은 각 항목마다 별 하나를 렌더링
        this.stars = [];
    }
    // 부모 컴포넌트에서 전달되는 값으로 stars 변수를 초기화
    StarsComponent.prototype.ngOnInit = function () {
        for (var i = 1; i <= this.count; i++) {
            this.stars.push(i > this.rating);
        }
    };
    __decorate([
        core_1.Input()
    ], StarsComponent.prototype, "count", void 0);
    __decorate([
        core_1.Input()
    ], StarsComponent.prototype, "rating", void 0);
    StarsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/components/stars/stars.component.html',
            style: [' .starrating {color : #d17581;}'],
            selector: 'auction-stars'
        })
    ], StarsComponent);
    return StarsComponent;
}());
exports.default = StarsComponent;
