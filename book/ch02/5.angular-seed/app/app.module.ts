/*  AppComponent 컴포넌트를 사용하는 모듈 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// 브라우저에서 Angular 애플리켕시녀을 실행하는데 필요한 BrowserModule 로드
// 이 모듈에서 사용하는 컴포넌트(AppComponent) 선언
@NgModule({
    imports : [BrowserModule],
    declarations : [AppComponent],
    bootstrap : [AppComponent]
})
export class AppModule {}