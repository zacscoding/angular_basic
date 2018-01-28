import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import ApplicationComponent from './components/application/application.component';
import CarouselComponent from './components/carousel/carousel.component';
import FooterComponent from './components/footer/footer.component';
import NavbarComponent from './components/navbar/navbar.component';
import ProductItemComponent from './components/product-item/product-item.component';
import SearchComponent from './components/search/search.component';
import StarsComponent from './components/stars/stars.component';
import { ProductService } from './services/product.service';
import {RouterModule} from "@angular/router";
import HomeComponent from "./components/home/home.component";
import ProductDetailComponent from "./components/product-detail/product-detail.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
    imports : [BrowserModule,
        RouterModule.forRoot([
            {path : '', component : HomeComponent},
            {path : 'products/:productId', component : ProductDetailComponent }

        ])
    ],
    // 모듈에서 사용하는 컴포넌트 정의
    declarations : [
        ApplicationComponent,
        CarouselComponent,
        FooterComponent,
        NavbarComponent,
        HomeComponent,
        ProductDetailComponent,
        ProductItemComponent,
        SearchComponent,
        StarsComponent],
    // ProductService 프로파이더 선언 -> ApplicationComponent에 주입될 때 사용
    providers : [ProductService,
        { provide : LocationStrategy, useClass : HashLocationStrategy}],
    bootstrap : [ApplicationComponent]
})
export class AppModule {}