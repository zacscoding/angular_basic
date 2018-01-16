import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { ProductDetailComponentParam } from "./components/product-param.component";

const routes : Routes = [
    { path : '', component : HomeComponent },
    // 라우팅 주소에 '/:id' 추가
    { path : 'product/:id', component : ProductDetailComponentParam }
];

@Component({
    selector : 'app',
    // routerLink에 전달되는 배열의 항목은 2개
    // '/product' :: 라우팅 주소, 1234 :: 상품의 ID
    template : `
        <a [routerLink]="['/']">Home</a>,        
        <a [routerLink]="['/product', 1234]">Product Details</a>,
        <router-outlet></router-outlet>
    `
})
class AppComponent {}

@NgModule({
    imports : [BrowserModule, RouterModule.forRoot(routes)],
    declarations : [AppComponent, HomeComponent, ProductDetailComponentParam],
    providers : [ {provide : LocationStrategy, useClass : HashLocationStrategy }],
    bootstrap : [AppComponent]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);