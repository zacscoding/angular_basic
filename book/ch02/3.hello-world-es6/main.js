import { Component } from '@angular/core'; // 애플리케이션 실행에 필요한 패키지 로드
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 컴포넌트 정의
@Component({
    selector : 'hello-world',
    template : '<h1> Hello {{ name }}! </h1>'
})
class HelloWorldComponent {
    constructor() {
        this.name = 'Angular';
    }
}

// 모듈 정의
@NgModule({
    imports : [ BrowserModule ],
    declarations : [ HelloWorldComponent ],
    bootstrap : [ HelloWorldComponent ]
})
export class AppModule { }

// 부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule);
