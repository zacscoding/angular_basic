import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector : 'product',
    styles : ['.product { background: cyan}'],
    template : `
        <div class="product">
            <h1>Product Detail for Product : {{ productID }}</h1>
        </div>
        <router-outlet></router-outlet>
        <p><a [routerLink]="['./seller', 5678]">Seller Info</a> </p>
    `
    // <router-outlet> :: 자식 컴포넌트를 표시하는 라우팅 영역을 따로 갖고 있음
    // <a [routerLink .. > :: 클릭 시 URL에 /setter/5678을 추가 & 이 컴포넌트의 라우팅 영역에
    // SellerInfoComponent를 렌더링
})
export class ProductDetailComponent{
    productID : string;

    constructor (route : ActivatedRoute ) {
        this.productID = route.snapshot.params['id'];
    }
}