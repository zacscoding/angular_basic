import { Component, Input } from "@angular/core";
import StarComponent from 'app/components/stars/stars.component';
import { Product } from 'app/services/product.service';

@Component({
    selector : 'auction-product-item',
    templateUrl : 'app/components/product-item/product-item.component.html'
})
export default class ProductItemComponent {
    // product 프로퍼티가 부모 컴포넌트에서 접근할 수 있도록 컴포넌트 외부로 공개
    // 부모 컴포넌트에서 값을 지정할 수 있음
    @Input() product : Product;
}