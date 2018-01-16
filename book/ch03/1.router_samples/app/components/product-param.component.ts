import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector : 'product',
    // 전달 받은 상품 ID를 템플릿에 바인딩해서 화면에 표시
    template : '<h1 class="product">Product Details for Product : {{ productID }}</h1>',
    styles : ['.product {background: cyan}']
})
export class ProductDetailComponentParam {
    productID : string;
    
    // 이 컴포넌트의 생성자는 ActivatedRoute 객체를 의존성으로 주입받음
    // ActivatedRoute 객체에는 이전 컴포넌트에서 전달한 인자가 모두 들어있고,
    // 생성자에 타입을 지정하면, Angular가 알아서 이 객체의 인스턴스를 초기화해서 주입
    constructor(route : ActivatedRoute) {
        // id 프로퍼티의 값을 가져와서 클래스 멤버 변수 productID로 할당. 이 변수는 템플릿에 바인딩 됨
        this.productID = route.snapshot.params['id'];
    }
}