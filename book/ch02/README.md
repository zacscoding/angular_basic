## Index

- <a href="#2.2">Angular 애플리케이션의 구성 요소</a>
- <a href="#2.3">2.3 SystemJS 모듈 로더</a>

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

> e.g) 적용 된 엘리먼트의 배경색을 파란색으로 변경하는 디렉티브

```
import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({ selector : '[highlight]'})

export class HighlightDirective {
  constructor (renderer : Renderer, el : ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'blue');
  }
}
```

=> 모듈에서 사용되는 모든 디렉티브는 해당 모듈 @NgModule 어노테이션의   
declarations 프로퍼티에 추가되어야 함

```
@NgModule({
  imports : [BrowserModule],
  declarations : [HelloWorldComponent, HighlightDirective],
  bootstrap : [HelloWorldComponent]
})
```

### 2.2.4 데이터 바인딩 기초
;Angular는 컴포넌트의 프로퍼티와 뷰를 동기화시키는 데이터 바인딩을 지원

> 컴포넌트의 프로퍼티 값을 템플릿에 표시

```<h1> Hello {{ name }}! </h1>```

> HTML 엘리먼트의 값을 컴포넌트 프로퍼티로 바인딩

```<span [hidden]="isValid">The field is required</span>```

> 엘리먼트에서 발생한 이벤트를 이벤트 핸들러에 연결  

```<button (click)="paceBid()">Place Bid</button>```

> 다른 엘리먼트의 프로퍼티를 참조

```
<input #title type="text" />
<span>{{ title.value }}</span>
```

---


<div id="2.3"></div>

## 2.3 SystemJS 모듈 로더
;보통 HTML 페이지에서 ```<script>``` 태그를 이용해 JS 파일을 로드 하지만,  
Angular에서는 SystemJS 라이브러리를 사용하는 것을 권장  
<a href="https://github.com/systemjs/systemjs">SystemJS 페이지</a>


### 2.3.1 모듈 로더

- <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-modules">ES6 최종 표준안</a>
- <a href="https://github.com/ModuleLoader/es-module-loader">폴리필</a>

### 2.3.2 모듈 로더 vs ```<script>```로더

> script 태그의 문제점  

- 개발자가 HTML 파일의 script 태그를 관리해야 함  
=> 시간이 지나 필요없는 파일이 존재  
=> 그 파일을 불러오는 script 태그를 삭제하지 않으면, 브라우저에서는  
여전히 파일을 불러옴  
=> 불필요한 네트워크 부하를 유발 & 초기 로드 시간 길어짐
- script 태그의 순서가 문제 될 수 있음.  
=> 브라우저가 보장하는 것은 HTML 문서의 head 안에 있는 script 태그를 순서대로  
실행하는 것 뿐, 그 외의 script 태그는 실행 순서를 보장하지 않음  

> 모듈 로더를 사용하면 좋은 점  
- 개발 단계에서는 애플리케이션 코드를 모듈 단위의 개별 파일로 나눈 것이 일반적  
=> 애플리케이션을 실행할 때 필요한 모듈을 브라우저에 자동으로 불러오기 때문에  
프로젝트를 관리하는데 도움

- 모듈 로더를 사용해 애플리케이션이 시작하는 파일을 기준으로, 사용하는 모든 모듈을  
찾아서 파일 하나로 번들링 할 수 있음  
=> 스크립트를 불러오는 순서나 순환 참조로 인한 오류를 걱정 할 필요X

### 2.3.3 SystemJS 시작하기
; SystemJS를 사용하면 전역 System 객체에서 제공하는 몇 가지 함수를 사용할 수 있음  

> System.import() 함수

```
System.import('./my-module.js'); // 파일 경로로 지정
System.import('@angular2/core'); // 모듈 이름으로 지정

=> 전달 인자가 ./로 시작하면 확장자가 생략되어 있어도 파일 경로로 인식
=> 모듈 이름이 전달되면, System.config()나 systemjs.config.js에 미리 설정 된  
정보를 바탕으로 모듈을 찾아보고 찾지 못하면 경로로 인식하고 파일을 찾음
```

=> System.import() 함수가 실행 되면 Promise 객체를 반환  
-> 모듈을 찾아 불러오는 작업이 성공하면 Promise가 fulfilled 상태 반환 & then() 콜백 실행  
-> 실패하면 Promise가 rejected 상태 반환 & catch() 콜백 실행

```
// lib.js
export let foo = 'foo';

// main.js
System.import('./lib.js').then(libModule => {
  libModule.foo === 'foo'; // true
});
```

**SystemJS 설정**  
; System.config() 함수를 사용해 SystemJS의 동작 방식 변경 가능  





















<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
---
