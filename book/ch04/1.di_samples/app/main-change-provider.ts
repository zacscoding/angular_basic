import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

class Product {
    constructor(public title : string) {}
}

// ProductService 정의
class ProductService {
    getProduct() : Product {
        // 실제 상품 정보를 가져오도록 HTTP 요청을 보내는 부분은 여기에 작성
        return new Product('iPhone8');
    }
}

// Mock 생성, 클래스를 인터페이스로 사용하는 것은 문제X
class MockProductService implements ProductService {
    getProduct(): Product {
        return new Product('Galaxy S8');
    }
}

@Component({
    selector : 'product1',
    template : '{{ product.title }}'
})
class Product1Component {
    product : Product;
    // ProductService 의존성 주입
    constructor(private productService : ProductService) {
        this.product = productService.getProduct();
    }
}

@Component({
    selector : 'product2',
    template : '{{ product.title }}',
    // MockProductService 지정
    providers : [ {provide : ProductService, useClass : MockProductService}]
})
class Product2Component {
    product : Product;
    // 생성자의 코드를 변경할 필요X => MockProductService 의존성 주입
    constructor(private productService : ProductService) {
        this.product = productService.getProduct();
    }
}

@Component({
    selector : 'app',
    // 2개의 컴포넌트 랜더링
    template : `
        <h2>A root component hosts two products <br>
            provided by different services</h2>
        <product1></product1>
        <br/>
        <product2></product2>
    `
})
class AppComponent{}

@NgModule({
    imports : [BrowserModule],
    // 애플리케이션 계층의 인젝터에 ProductService 프로바이더를 등록
    providers : [ProductService],
    declarations : [AppComponent, Product1Component, Product2Component],
    bootstrap : [AppComponent]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);















