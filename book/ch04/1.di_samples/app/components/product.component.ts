import { Component } from "@angular/core";
import { ProductService, Product } from "../service/product.service";

@Component({
    selector : 'di-product-page',
    template : `
        <div>
            <h1>Product Details</h1>
            <h2>Title : {{ product.title }}</h2>
            <h2>Description : {{ product.description }}</h2>
            <h2>Price : \${{ product.price }}</h2>
        </div>
    `,
    // ProductService 토큰은 ProductService 클래스를 그대로 사용하기 때문에 간단한 표기법 사용
    providers : [ProductService]
})
export default class ProductComponent {
    product : Product;
    // 컴포넌트가 실행될 때 Angular 프레임워크가 ProductService의 인스턴스를 생성하고 주입
    constructor(productService : ProductService) {
        this.product = productService.getProduct();
    }
}

