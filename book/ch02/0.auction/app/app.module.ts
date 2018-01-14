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

@NgModule({
    imports : [BrowserModule],
    // 모듈에서 사용하는 컴포넌트 정의
    declarations : [
        ApplicationComponent,
        CarouselComponent,
        FooterComponent,
        NavbarComponent,
        ProductItemComponent,
        SearchComponent,
        StarsComponent],
    // ProductService 프로파이더 선언 -> ApplicationComponent에 주입될 때 사용
    providers : [ProductService],
    bootstrap : [ApplicationComponent]
})
export class AppModule {}