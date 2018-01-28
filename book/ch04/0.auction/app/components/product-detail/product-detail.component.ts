import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, Review, ProductService } from "../../services/product.service";

@Component({
    selector : 'auction-product-page',
    templateUrl : 'app/components/product-detail/product-detail.component.html'
})
export default class ProductDetailComponent {
    product : Product;
    reviews : Review[]
    // ActivatedRoute와 ProductService 의존성 주입
    constructor (route : ActivatedRoute, productService : ProductService) {
        let prodId : number = parseInt(route.snapshot.params['productId']);
        this.product = productService.getProductById(prodId);
        this.reviews = productService.getReviewsForProduct(prodId);
    }
}