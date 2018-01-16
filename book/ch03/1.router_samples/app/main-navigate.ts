import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Router, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home.component";
import { ProductDetailComponent } from "./components/product.component";

const routes : Routes = [
    { path : '', component : HomeComponent },
    { path : 'product', component : ProductDetailComponent }
];

@Component({
    selector : 'app',
    template : `
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['/product']">Product Details</a>        
        <input type="button" value="Product Details"
               (click)="navigateToProductDetail();" />
        <router-outlet></router-outlet>
    `
    // input :: 버튼 클릭시 navigateToProductDetail() 실행
})
class AppComponent {
    // 클래스 멤버 변수 outer에는 Router 객체의 인스턴스가 의존성으로 주입
    constructor (private router : Router) {}
    
    navigateToProductDetail() {
        // 코드에 의해 '/product'로 이동
        this.router.navigate(['/product']);
    }
}

@NgModule({
    imports : [BrowserModule, RouterModule.forRoot(routes)],
    declarations : [AppComponent, HomeComponent, ProductDetailComponent],
    providers : [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
    bootstrap : [AppComponent]    
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);