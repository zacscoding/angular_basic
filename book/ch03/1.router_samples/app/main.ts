import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { ProductDetailComponent } from './components/product.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// 라우터 설정을 불러옴
import { routing } from './app.routing';


@NgModule({
    // NgModule에 라우터 설정 추가
    imports : [BrowserModule,
        routing],
    declarations : [AppComponent,
        HomeComponent,
        ProductDetailComponent],
    // HashLocationStrategy 방식을 사용하도록 프로바이더를 설정
    providers : [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
    bootstrap : [AppComponent]
})
class AppModule {}

// 애플리케이션을 시작
platformBrowserDynamic().bootstrapModule(AppModule);