# ch07. 폼 처리하기

#### 7장에서 다루는 내용  
- Angular 폼 구성 요소
- 템플릿 기반 폼 처리하기
- 반응형 폼 처리하기
- 폼 유효성 검증  

**템플릿 기반 폼 vs 반응형 폼**  
- 템플릿 기반 폼 : 컴포넌트 템플릿을 최대한 활용해서 폼을 구성  
폼 구조, 각 필드의 형식, 유효성 검증 규칙을 모두 템플릿에서 정의  
- 반응형 폼 : TypeScript 코드에 있는 폼 모델 기준, 미리 준비된  
템플릿에 바인딩하거나 템플릿을 동적으로 구성하는 방식  

#### index  

- <a href="#7.1">7.1 HTML 폼</a>
- <a href="#7.2">7.2 템플릿 기반 폼</a>
- <a href="#7.3">7.3 반응형 폼</a>



---  

<div id="7.1"></div>  

## 7.1 HTML 폼  
HTML에서도 폼 구성, 유효성 검증하며 데이터를 서버로 전송가능  
BUT 원하는 로직으로 검증하고, 사용자가 알아보기 쉽게 에러를 표시한다든지  
원하는 형식으로 파싱 등 HTML 표준 폼만으로는 충분하지 않음  
(웹 APP에 사용 할 프레임워크를 선택할 때 폼을 얼마나 자유롭게 다룰 수 있는가도 중요한  
기준이 될 수 있음)  

### 7.1.1 HTML 표준 폼  

> 표준 HTML으로 만든 회원 가입 폼  

```
<form action="register" method="POST">
  <div>Username : <input type="text"></div>
  <div>SSN : <input type="text"></div>
  <div>Password : <input type="password"></div>
  <div>Confirm password : <input type="password"></div>
  <button type="submit">Submit</button>
</form>
```

=> HTML 표준 폼은 아래와 같은 점에서 SPA에 적합하지 않음  
- 각 입력 필드에 유효성 검증 로직이 적용되어야 한다
- 에러 메시지는 문제가 발생한 입력 필드 근처에 표시되는 것이 좋다  
- 연관된 항목은 유효성 검사를 할 때도 같이 검사해야 한다. 이 폼에는 비밀번호를  
받는 필드와 비밀번호를 확인하는 필드가 연관되어 있기 때문에, 어느 한 필드의 값이 변경되면  
다른 필드도 다시 검사해야 한다.  
- 데이터를 서버로 보낼 때 APP에서 이 과정을 조작할 수 있어야 한다
- 데이터를 서버로 보낼 때 일반적인 HTTP 요청이나 AJAX 요청으로 보낼지, WebSocket을  
사용할지 결정할 수 있어야 한다.  

**HTML 유효성 검증 어트리뷰트**  
입력 필드에 required, pattern, maxlength, min, max, step과 같은 표준 어트리뷰트를 사용해서  
유효성을 검증할 수 있음  

```
<input id="username" type="text" required pattern="[a-zA-Z0-9]+">  
```  

=> Chrome 등 브라우저에서 규칙에 맞지 않는 입력 데이터가 입력되면 에러메시지(요청한 형식과 일치시키세요)  
가 표시하지만, 아래와 같은 UX 단점이 존재

- 메시지의 의미가 모호하며 문제를 해결할 수 있는 명확한 정보를 제공하지 않음
- 입력 필드에서 다른 곳으로 포커스를 옮기면 에러 메시지도 사라짐
- 메시지 팝업이 APP 스타일과 어울리지 않음  

**입력 필드 타입 지정하기**  
; 입력 필드에 text, number, url, email과 같은 타입을 지정하면, 지접한 타입 이외의 값이 입력되는 것을 막음  

```
<input id="zipcode" type="number" min="10000" max="99999">
```  

=> 숫자로 이루어진 우편번호 5자리를 제한하기 위해 사용  
BUT 5자리의 숫자가 모두 우편번호인 것X + 사용자가 입력한 주소에 맞는 우편번호만 유효  

### 7.1.2 Angular 폼  

- 템플릿 기반 폼 : 템플릿에서 디렉티브를 사용하여 컴포넌트 템플릿에 폼 모델을 정의  
(HTML 문법만으로는 다양한 폼을 구성하는 데에 한계가 있어, 템플릿 기반의 폼은 단순한 경우에만 사용)
- 반응형 폼 : 클래스 코드에서 폼 컨트롤을 사용. TypeScript코드에서 폼 데이터 구조를 정의하며  
폼 모델을 만들고 난 후에는 form* 접두사가 붙은 디렉티브를 사용해서 HTML 템플릿에 모델을 연결  

=> 두 방식의 중요개념 + 차이  

- 두 방식 모두 폼 데이터를 저장하는 데이터 구조(model)가 있음  
템플릿 기반 폼에서는 디렉티브를 사용해서 템플릿에 모델을 정의  
반응형 폼에서는 TypeScript 코드로 모델을 정의하고, HTML 템플릿에 각 항목 연결  
- 반응형 폼에서는 @angular/forms 모듈의 FormControl, FormGroup, FormArray를 사용하는 클래스 객체여야 함
- 반응형 폼으로 폼을 구성하더라도, 화면을 구성하는 HTML 템플릿은 여전히 필요. 폼 컨트롤이  
연결될 HTML 엘리먼트는 템플릿에서 정의해야 함  

**폼 API 활성화 하기**  
; NgModule 어노테이션의 imports 항목에 템플릿 기반 폼(FormsModule), 반응형 폼(ReactiveFormsModule) 추가

```
```  

---  

<div id="7.2"></div>  

## 7.2 템플릿 기반 폼  
; 디렉티브만 사용가능하고, FormsModule에 있는 NgModel, NgModelGroup, NgForm 이용  

=> 5장의 양방향 데이터 바인딩을 구현할 때 NgModel 디렉티브 이용  
=> 폼에서는 이 디렉티브가 다른 역할(HTML 엘리먼트를 지정해서 폼 모델을 구성하는 용도)로 사용  


### 7.2.1 템플릿 기반 폼에 사용하는 디렉티브  

**NgForm**  
; 폼 전체를 가리키는 디렉티브이며, 폼 모듈을 로드하면 모든 ```<form>``` 엘리먼트에  
이 디렉티브가 자동으로 적용  
=> 기존에 동작하던 ```<form>``` 엘리먼트가 동작하지 않을 수 있으니 주의  
=> NgForm 디렉티브는 자식 HTML 엘리먼트를 순회하며 NgModel 디렉티브가 있는 항목을 찾고  
이 엘리먼트를 폼 모델에 추가  

```
<div ngForm></div> // 어트리뷰트로 적용
<ngForm></ngForm> // 엘리먼트로 적용
```  
=> 사용하는 CSS 프레임워크에서 정해진 구조의 HTML을 요구하거나 form 엘리먼트를 사용할 수  
없는 경우, 기존 화면 구성을 건드리지 않고 NgForm을 적용해야 하는 경우에 위와 같은 방식 사용 가능  

```
<form ngNoForm></form>
```  
=> form엘리먼트를 사용하지만, Angular로 제어하지 싶지 않을 경우  
=> ngNoForm 어트리뷰트를 사용하면 해당 폼에 NgForm 인스턴스가 생성되지 않으며 일반 HTML로 동작  

```
<form #f="ngForm"></form>
<pre>{{ f.value | json }}</pre>
```  
=> @Directive 어노테이션 안에 exportAs 프로퍼티가 선언되어 있어 NgForm 인스턴스에서 값을 참조할 때  
지역 템플릿 변수를 지정해서 사용할 수 있음  
=> NgForm 인스턴스의 f 변수가 ngForm이라는 이름을 사용하도록 ```<form>``` 엘리먼트에 exportAs 프로퍼티  
(위의 #로 사용)를 지정하면, f 변수를 통해 NgForm 인스턴스의 프로퍼티에 접근 가능  
=> 폼의 모든 값을 JS 객체 타입으로 확인하려면, NgForm 인스턴스의 value 프로퍼티를 사용할 수 있으며  
json 파이프를 사용해서 화면에 표시할 수도 있음  

```
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)"></form>
```  
=> NgForm을 사용하면 폼에서 발생하는 submit 이벤트를 가로채서 서버로 데이터를 보내는 동작을 막음  
=> 위 코드는 이벤트 바인딩 문법으로 ngSubmit 이벤트를 onSubmit() 함수에 연결하며, ngSubmit 이벤트가  
발생해서 onSubmit() 함수가 실행될 때 NgForm에서 선언한 템플릿 변수 f의 value 프로퍼티를 인자로 전달  

**NgModel**  
; 템플릿 기반 폼에서 NgModel은 폼에 있는 필드 하나를 가리키며, 이 디렉티브를 사용하면 필드에 FormControl  
인스턴스가 생성되고, 이 인스턴스에 필드의 값을 저장  

```
<form>
  <input type="text"
    // ngModel을 HTML 엘리먼트에 사용할 때는 name 어트리뷰트를 지정
    name="username"
    // 데이터 바인딩 문법이 아니므로 할당하는 값이나 괄호가 없음
    // NgForm 디렉티브를 위한 것
    ngModel>
</form>
```  
=> NgForm.value 프로퍼티는 폼에 있는 모든 값을 저장하고 있는 JS 객체이며  
위 코드에서 name 어트리뷰트로 지정 된 input 필드의 값은 JS 객체인 NgForm.value에  
name 프로퍼티로 저장  

```
<form>
  <input type="text"    
    name="username"
    ngModel    
    // NgModel의 exportAs 프로퍼티는 ngModel을 가리킴.
    // 이 코드에서는 템플릿 변수 c로 선언
    #c="ngModel">
    // 템플릿 변수 c로 지정한 input 엘리먼트의 값을 참조하기 위해
    // NgModel 인스턴스의 value 프로퍼티를 사용
  <pre>{{c.value}}</pre>
</form>
```  

**NgModelGroup**  
; 폼 필드를 그룹으로 묶어 사용할 수 있음. NgForm과 유사하게 NgModelGroup도 FormGroup 인스턴스를  
내부적으로 생성  
=> 기본적으로 NgModelGroup을 사용하면 NgForm.value 객체 안에 또 다른 객체를 만들고 값을 저장하는데,  
NgModelGroup에 속한 모든 필드는 이 객체의 프로퍼티가 됨  

```
<form #f="ngForm">
  // ngModelGroup 어트리뷰트에 중첩된 형태로 만들 객체의 이름을 지정
  <div ngModelGroup="fullName">
    <input type="text" name="firstName" ngModel>
    <input type="text" name="lastName" ngModel>
  </div>
</form>

// NgModelGroup에서 만든 fullName 객체를 참조
<pre>First name : {{ f.value.fullName.firstName }}</pre>
<pre>Last name : {{ f.value.fullName.lastName }}</pre>
```  

### 7.2.2 HTML 폼에 적용하기  

> 01_template_driven.ts 부분

```
<form #f="ngForm" (ngSubmit) = "onSubmit(f.value)">
...
</form>
```  

=> ```<form>``` 엘리먼트에 적용되는 NgForm 객체를 가리키기 위해 템플릿 변수 f선언  
=> 위 변수로 value나 valid와 같은 폼 프로퍼티에 접근할 수 있고, 폼에서 에러가 발생하면  
어떤 종류의 에러가 발생했는지도 확인할 수 있음  

```
<div>Username : <input type="text" name="username" ngModel></div>
<div>SSN : <input type="text" name="ssn" ngModel></div>
```  
=> ngModel 어트리뷰트를 사용해서 ```<input>``` 엘리먼트에 NgModel 디렉티브를 적용  
=> ngModel 어트리뷰트를 적용하는 엘리먼트에는 name 어트리뷰트도 함께 사용해야 한다  

```
<div ngModelGroup="passwordsGroup">
  <div>Password : <input type="password" name="password" ngModel></div>
  <div>Confirm Password : <input type="password" name="pconfirm" ngModel></div>
</div>
```  
=> ngModelGroup 디렉티브를 사용하면 NgForm 폼 데이터를 저장할 때 중첩된 객체로 저장되는데,  
이 객체의 프로퍼티는 ngModelGroup 디렉티브의 자식 필드로 구성된다.  
=> password 필드와 pconfirm 필드를 구분하기 위해 name 어트리뷰트를 다르게 지정  

![회원가입 폼에 적용 된 폼 디렉티브](./pics/[7-1]회원가입_폼_디렉티브.png)

---

<div id="7.3"></div>

## 7.3 반응형 폼  







































<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />  
---  
