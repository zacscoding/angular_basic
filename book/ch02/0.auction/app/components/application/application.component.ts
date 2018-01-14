import { Component, ViewEncapsulation } from "@angular/core";
//Product 서비스를 불러옴. 화면에 표시할 데이터는 이 서비스에서 제공
import { Product, ProductService } from '../../services/product.service';

// ApplicationComponent 클래스에 @Component 어노테이션을 붙여서 Angular 컴포넌트로 만듬
@Component({
    // selector는 index.html 파일에 이 컴포넌트가 사용될 위치를 지정
    selector : 'auction-application',
    // HTML 템플릿은 application.component.html 파일로 지정
    templateUrl : 'app/components/application/application.component.html',
    // CSS는 application.component.css 파일로 지정
    styleUrls : ['app/components/application/application.component.css'],
    encapsulation : ViewEncapsulation.None
})
// ApplicationComponent는 다른 클래스인 AppModule에서 사용되기 때문에 모듈 외부로 공개
export default class ApplicationComponent {
    // 제네릭을 사용해서 Product 타입의 배열을 클래스 멤버 변수 products에 선언
    products : Array<Product> = [];

    // 클래스 생성자에 인자로 ProductService를 전달하면 Angular가 적당한 프로바이더를 찾아서 의존성으로 주입
    constructor (private productService : ProductService) {
        // 상품의 목록을 받아서 products 프로퍼티에 할당. 컴포넌트 프로퍼티는 데이터 바인딩을 사용해서
        // 화면에 표시할 수 있음
        this.products = this.productService.getProducts();
    }
}