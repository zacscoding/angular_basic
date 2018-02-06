## CH05. 바인딩, 옵저버블, 파이프

### Intro

- 데이터 바인딩의 종류
- 어트리뷰트 바인딩 vs 프로퍼티 바인딩
- 이벤트를 옵저버블 데이터 스트림으로 처리하기
- 불필요한 HTTP 요청을 취소해서 네트워크 부하 줄이기
- 파이프 사용 방법

### Index

- <a href="#5.1">5.1 데이터 바인딩</a>
- <a href="#5.2">5.2 반응형 프로그래밍과 옵저버블</a>


<div id="5.1"></div>

## 5.1 데이터 바인딩

```
<!-- 변수의 값이나 표현식의 결과를 템플릿에 문자열로 표시 -->
<h1>Hello {{name}}!</h1>
<!-- <span> 엘리먼트의 DOM 객체 프로퍼티와 컴포넌트 프로퍼티를 바인딩 -->
<span [hidden]="isValid">This field is required</span>
<!-- click 이벤트를 바인딩-->
<button (click)="placeBid()">Place Bid</button>
```

=> Angular에서 데이터 바인딩은 기본적으로 단방향  
(컴포넌트 프로퍼티에서 화면을 향하는 방향 or 화면에서 발생 한 이벤트가  
컴포넌트 메소드를 향하는 방향이라는 것을 의미)  

### 5.1.1 이벤트 바인딩  

> click 이벤트 -> onClickEvent() 함수  
/ input 이벤트 -> onInputEvent() 함수 연결예제

```
<button (click)="onClickEvent()">Get Products</button>
<input placeholder="Product name" (input)="onInputEvent()">
```

![이벤트_바인딩_문법](./pics/[5-1]이벤트_바인딩_문법.png)

### 5.1.2 프로퍼티 바인딩, 어트리뷰트 바인딩  
; HTML 엘리먼트는 태그에 어트리뷰트를 지정하는 방식을 속성으로 추가할 수 있고,  
브라우저는 각 태그마다 DOM 객체를 생성하며 DOM 객체는 프로퍼티로 속성을 표현  

=> 브라우저는 HTML 엘리먼트를 DOM 객체(노드)로 만들고 이 DOM 객체를 웹 페이지에  
렌더링하는데, DOM 객체의 프로퍼티 값이 변경되면 그때마다 페이지를 다시 렌더링  

**프로퍼티 바인딩**  

> AppComponent 클래스의 변수인 greeting이 브라우저의 <input> 태그의  
프로퍼티에 바인딩 예제  

![프로퍼티바인딩](./pics/[5-2]프로퍼티_바인딩.png)  


- (1) : 컴포넌트 클래스 변수(greeting)를 DOM 객체의 value 프로퍼티로 바인딩  
(브라우저가 HTML 엘리먼트를 렌더링 한 후 확인하면 InputHTMLElement 객체의 value  
프로퍼티 값이 'A value'로 할당)  
- (2) : HTML문서에 있는 input 엘리먼트의 어트리뷰트에는 컴포넌트 변수 greeting 값이  
반영되지 않음  
- (3) : DOM 노드의 value 프로퍼티가 화면에 표시. 컴포넌트 클래스 변수 greeting의 값이  
변경되면, Angular가 DOM 노드에 있는 value 프로퍼티를 갱신하고 브라우저는 새로운 값을  
렌더링해서 DOM과 화면을 동기화. (단방향이므로 `<input>` 태그의 값이 변경되어도 컴포넌트  
클래 변수 greeting 값이 변경되지 않음)
- (4) : DOM 노드의 value 프로퍼티가 변경되어 HTML 엘리먼트의 어트리뷰트 값은 변경되지 않음  
- (5) : 브라우저에서 사용자가 `<input>` 필드의 값을 변경해도 HTML 엘리먼트의 어트리뷰트 값은 변경X  
사용자가 보는 값은 DOM 객체에서 온 것 (HTML 문서에서 온 것 X)

**어트리뷰트 바인딩**  

```<input [attr.value]="greeting">```

![어트리뷰트_바인딩](./pics/[5-3]어트리뷰트_바인딩.png)  

- (1) : 컴포넌트의 클래스 변수인 greeting을 HTML 문서에 있는 엘리먼트 어트리뷰트로  
바인딩  (attr. 사용하는 것 잊지말기) => HTML문서에 있는 ```<input>```엘리먼트의  
value 어트리뷰트에 "A value"라는 속성이 지정  
- (2) : DOM 노드에는 컴포넌트 변수 greeting 값이 반영되지 않음  
- (3) : 화면에 표시되는 DOM 객체는 'A value'라는 값을 받게 됨. 브라우저가 HTML문서의  
엘리먼트와 DOM을 동기화 했기 때문(Angular 코드가 반영 된 것은X)  
- (4) : 브라우저는 화면과 DOM을 동기화하기 때문에 DOM 노드의 value 프로퍼티 값이 화면에 표시  


> Eg : app/bindings/attribute-vs-property.ts  

### 5.1.3 템플릿 바인딩  
=> HTML엘리먼트가 화면에 표시되는 것을 조작하려면, 엘리먼트의 hidden 어트리뷰트나  
display 스타일에 불리언 값을 바인딩(화면에 표시하거나 숨길 수 있지만, DOM 트리에는  
여전히 존재)
=> Angular는 NgIf, NgSwitch, NgFor와 같은 구조 디렉티브(structural directives)를 통해  
DOM 트리에 노드를 추가하거나 제거할 수 있음  

```
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app',
  template: `
    <button (click)="flag=!flag">Toggle flag's value</button>
    <p>
      Flag's value : {{ flag }}
    </p>
    <p>
      1. span with *ngIf="flag" : <span *ngIf="flag"> Flag is True</span>
    </p>
    <p>
      2. template with [ngIf]="flag" :
      <ng-template [ngIf]="flag">Flag is true</ng-template>
    </p>
  `
})
class AppComponent {
  flag: boolean = true;
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

### 5.1.4 양방향 데이터 바인딩
; 양방향 데이터 바인딩(Two-way data binding)을 사용하면 뷰(화면)과 모델(컴포넌트)  
을 간단하게 동기화 할 수 있음

> 이벤트 바인딩

```
<input (input)="onInputEvent($event)">
```

> 프로퍼티 바인딩  

```
<input [value]="myComponentProperty">
```

> 양방향 바인딩  

```
<input [value]="myComponentProperty" (input)="onInputEvent($event)>"
```

> Angular의 [()] 표기법 + NgModule 디렉티브  

```
<input [(ngModel)]="myComponentProperty">
```

> E.g app/bindings/two-way-bindings.ts

---

<div id="5.2"></div>

## 5.2 반응형 프로그래밍과 옵저버블































---


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
