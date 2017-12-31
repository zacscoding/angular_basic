import {Component} from '@angular/core'; // 애플리케이션 실행에 필요한 패키지 로드
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// 컴포넌트 선언
@Component({ // HelloWorldComponent 클래스 위에 @Component 어노테이션을 사용해서 이클래스를 Angular 컴포넌트로 만듬
    selector : 'hello-world',
    template : '<h1>Hello {{name}}!</h1>' // 컴포넌트가 렌더링 될 HTML 마크업은 template 항목에 정의
})
class HelloWorldComponent { // HelloWorldComponent 클래스는 Angular 프레임워크에서 컴포넌트로 사용
    name : string; // name 프로퍼티는 컴포넌트 템플릿에 바인딩되어 화면에 표시
    constructor() {
        this.name = 'Angular'; // name 프로퍼티 초기 값 할당
    }
}

// 모듈 선언
@NgModule({ // 모듈정의
    imports : [BrowserModule],
    declarations : [HelloWorldComponent],
    bootstrap : [HelloWorldComponent]
})
export class AppModule{} // 모듈로 사용할 클래스 선언

// 부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule) // 모듈을 브라우저에 로드
