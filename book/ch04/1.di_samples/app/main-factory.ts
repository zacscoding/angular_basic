import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class Product {
    constructor(public title : string){}
}

class ProductService {
    getProduct() : Product {
        return new Product('iPhone8');
    }
}

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
    constructor(private productService : ProductService) {
        this.product = productService.getProduct();
    }
}

@Component({
    selector : 'product2',
    providers : [{
        provide : ProductService,
        // 팩토리함수는 isDev 인자를 사용 & 이 값은 외부에서 주입 
        useFactory : (isDev) => {
            if(isDev) {
                return new MockProductService();
            }
            else {
                return new ProductService();
            }
        },
        // deps : 팩토리 함수에서 사용하는 의존성 객체
        deps : ['IS_DEV_ENVIRONMENT']
    }],
    template : '{{ product.title }}'
})
class Product2Component {
    product : Product;
    constructor(productService : ProductService) {
        this.product = productService.getProduct();
    }
}

@Component({
    selector : 'app',
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
    declarations : [AppComponent, Product1Component, Product2Component],
    // 고정 된 값을 IS_DEV_ENVIRONMENT 토큰으로 등록하려면, useValue를 사용해서 값을 지정
    providers : [ProductService, {provide : 'IS_DEV_ENVIRONMENT', useValue : false}],
    bootstrap : [AppComponent]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);