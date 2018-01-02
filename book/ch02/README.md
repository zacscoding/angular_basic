## Index

- <a href="#2.2">Angular 애플리케이션의 구성 요소</a>

---

> http-server 설치 & 실행(루트 폴더에서)

```
npm i -g http-server
http-server
```

=> http://localhost:8080 접속

> live-server 사용

```
npm i -g live-server
live-server
```


<div id="2.2"></div>

## 2.2 Angular 애플리케이션의 구성 요소

### 2.2.1 모듈(Module)
; 관련된 컴포넌트나 서비스, 디렉티브 등을 편하게 사용하기 위해 하나로 모은 것  

```
// 모듈 정의
@NgModule({
    // 브라우저를 사용하는 모든 앱은 BrowserModule을 불러와야 함
    imports : [ BrowserModule ],
    // AppModule(루트모듈)에 HelloWorldComponent를 선언
    // -> 애플리케이션 전역에서 사용 가능
    declarations : [ HelloWorldComponent ],
    // 애플리케이션을 실행하면 @NgModule 어노테이션의 bootstrap으로 지정 된
    // HelloWorldComponent가 루트 컴포넌트로 렌더링
    bootstrap : [ HelloWorldComponent ]
})
export class AppModule { }

// 루트 애플리케이션 실행
platformBrowserDynamic().bootstrapModule(AppModule);
```

<a href="https://angular.io/guide/ngmodule">Angular Guide docs</a>

### 2.2.2 컴포넌트 (Component)
; Angular 애플리케이션을 구성하는 기본 요소  
=> 화면을 정의하는 뷰와 컴포넌트의 동작을 정의하는 클래스로 구성

```
@Component({
    // 컴포넌트가 위치 할 selector
    selector : 'app-component',
    // 렌더링 될 내용(template or templateUrl)
    template : '<h1> Hello !</h1>'
})
class HelloWorldComponent {}  
```

> 컴포넌트 > JavaScript 코드로 변경

```
@Component({
    selector : 'hello-world',
    template : '<h1>Hello {{name}}!</h1>'
})
class HelloWorldComponent {
    name : string;
    constructor() {
        this.name = 'Angular';
    }
}
...

--- JavaScript Code ---

var HelloWorldComponent = (function() {
  function HelloWorldComponent() {
    this.name = 'Angular';
  }

  return HelloWorldComponent;
}());

HelloWorldComponent = __decorate([
  Component({
    selector : 'hello-world',
    te mplate : '<h1>Hello {{ name }}! </h1>'
    })  
], HelloWorldComponent);

```

=> 템플릿은 HTML 마크업을 기본으로 사용하지만, 서드 파티 프레임워크를 사용하거나  
네이티브 화면을 구성하는 마크업 언어를 사용할 수도 있음

### 2.2.2 디렉티브(Directive)
; HTML 엘리먼트에 사용자가 원하는 동작을 추가할 수 있음  
(@Directive 어노테이션을 클래스에 붙여서 선언)

```
@Directive({
  // 이 셀렉터가 선택하는 HTML 엘리먼트는 log-directive 어트리뷰트가 있는 input 엘리먼트   
  selector : 'input[log-directive]',
  host : {
    // 호스트 엘리먼트에 입력 이벤트를 연결
    // (이 디렉티브에서 호스트 엘리먼트 <input> 엘리먼트)
    '(input)' : 'onInput($event)'
  }
})
class LogDirective {
  onInput(event) { // <input> 엘리먼트의 값을 콘솔로 출력하는 핸들러
    console.log(event.target.value);
  }
}  
```

















<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
---
