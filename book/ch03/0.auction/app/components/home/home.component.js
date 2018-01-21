"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(productService) {
        this.productService = productService;
        this.products = [];
        this.products = this.productService.getProducts();
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'auction-home-page',
            styleUrls: ['app/components/home/home.component.css'],
            template: "\n        <div class=\"row carousel-holder\">\n            <div class=\"col-md-12\">\n                <auction-carousel></auction-carousel>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div *ngFor=\"let product of products\" class=\"col-sm-4 col-lg-4 col-md-4\">\n                <auction-product-item [product]=\"product\"></auction-product-item>\n            </div>\n        </div>\n    "
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.default = HomeComponent;
