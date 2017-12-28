# TypeScript

#### index

- <a href="#b1"> B.1 Angular 애플리케이션이 TypeScript인 이유 </a>
- <a href="#b2"> B.2 트랜스파일러(==compiler)의 역할</a>
- <a href="#b3"> B.3 TypeScript 시작하기 </a>
- <a href="#b4"> B.4 JavaScript의 상위 집합</a>
- <a href="#b5"> B.5 타입 지정</a>
- <a href="#summary">정리</a>
- <a href="#b6"> B.6 </a>

---

<div id="b1"></div>

### B.1 Angular 애플리케이션이 TypeScript인 이유

> why TypeScript

- 생산성  
=> JS는 런타임중에 에러가 대부분 발생(컴파일러 X)
=> TypeScript는 JavaScript로 변형되서 실행됨(웹브라우저or Node.js 환경에서 실행되기 전)  
=> TypeScript는 타입을 지원(IDE 등 개발 시간 절약 가능)  
... see book(p.693)

---

<div id="b2"></div>

### B.2 트랜스파일러(==compiler)의 역할
; <a href="http://www.typescriptlang.org/play/">TypeScript play </a>

> TypeScript

```
let foo: string;
class Bar {
}
```

> JavaScript

```
var foo;
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
```
---

<div id="b3"></div>

### B.3 TypeScript 시작하기

- <a href="https://github.com/Microsoft/TypeScript">TypeScript GITHUB </a>

> Node js 설치

<a href="https://nodejs.org/en/">https://nodejs.org/en/</a>

```# app.js -> console.log('Hello NodeJS');```
```# node app.js```



> TypeScript 컴파일러 전역 설치  
g : 전역 환경

```npm i -g typescript```

> Version check

``` #tsc -v  or #tsc --version```


> main.ts => main.js 트랜스파일

```tsc main.ts```

> 트랜스파일 + 소스맵 생성 (main.map)  
(브라우저에서 디버깅 가능)

```tsc main.ts --sourcemap```

> JavaScript 컴파일 옵션

```tsc main.ts --t ES5```

> 와치 모드
(변경 시 자동 트랜스파일?)

```tsc -w *.ts```

#### 컴파일 옵션 지정

> tsconfig.json  
<a href="http://www.typescriptlang.org/docs/handbook/compiler-options.html">Compile Options REF</a>

```
{
  "compilerOptions" : {
    "target" : "es5",
    "module" : "commonjs",
    "emitDecoratorMetadata" : true,
    "experimentalDecorators" : true,
    "rootDir" : ".",
    "outDir" : "./build",
    "exclude" : [
      "node_modules"
    ]
  }
}
```

<div id="b5"></div>

### B.5 타입 지정

```
let name1 = 'John Smith';
let name2 : string = 'John Smith2';
```

=> 타입을 지정하지 않으면, 할당되는 값을 기준으로 타입추론(type inference) 동작

> 타입 체크 에러(컴파일 시)

```
let name1 = 'John Smith';
name1 = 123; // 1)name1을 string 타입으로 추론 한 변수에 숫자를 할당X  

let name2 : string = 'John Smith2';
name2 = 123; // 2)명시적으로 string 타입으로 지정 한 변수에 숫자 할당 X

=>
error.ts(2,1): error TS2322: Type '123' is not assignable to type 'string'.
error.ts(5,1): error TS2322: Type '123' is not assignable to type 'string'.
```

> 명시적 타입 지정

```
// any의 하위 타입들
let salary : number;
let name : string = 'Alex';
let isValid : boolean;
let customerName : string = null;

// any는 모두 가능
let name2 : any = 'John Smith';
name2 = 123;
```

#### B.5.1 함수

> JavaScript 기반 calcTax()

```
function calcTax(state, income, dependents) {
  if(state == 'NY') {
    return income * 0.06 - dependents * 500;
  }
  else if(state == 'NJ') {
    return income * 0.05 - dependents * 300;
  }
}

//일반적인 호출
calcTax('NJ', 50000, 2);

// 에러 -> 함수를 실행하기 전까지는 모름
calcTax('NJ', 50000, 'two');
```

> TypeScript로 작성한 calcTax()

```
	if(state == 'NY') {
    function calcTax(state : string, income : number, dependents : number) : number {
		return income * 0.06 - dependents * 500;
	}
	else if(state == 'NJ') {
		return income * 0.05 - dependents * 300;
	}
}

let tax : number = calcTax('NJ', 50000, 'two');
```

> tac calcTax.js

```
calcTax.ts(10,22): error TS2345: Argument of type '"two"' is not assignable to parameter of type 'number'.
```

---

#### B.5.2 인자 기본값

> 인자의 기본값을 사용하는 예제

```
// 에러!!
function calcTax(state : string = 'NY', income : number, dependents : number) : number {
  //
}

// 인자를 마지막에 전달해야 함
function calcTax(income : number, dependents : number, state : string = 'NY') : number {
  //
}

let tax : number = calcTax(50000, 2);
or
let tax : number = calcTax(50000, 2, 'NY');
```

#### B.5.3 옵션 인자

> 세금계산하는 함수에서, 부양가족은 필수 인자가 아닌 경우

```
function calcTax(income : number, state : string = 'NY', dependents? : number) : number {
	let deduction : number;
	// 옵션 인자가 전달 된 경우의 로직 처리
	if(dependents) {
		deduction = dependents * 500;
	}
	else {
		deduction = 0;
	}

	if(state == 'NY') {
		return income * 0.06 - deduction;
	}
	else if(state == 'NJ') {
		return income * 0.05 - deduction;
	}
}

console.log('Your tax is', calcTax(50000));
console.log('Your tax is', calcTax(50000, 'NJ'));
console.log('Your tax is', calcTax(50000, 'NJ',2));

== console ==
Your tax is 3000
Your tax is 2500
Your tax is 1500
```

#### B.5.4 화살표 함수 표현식
; 화살표 함수 표현식(arrow function expression)을 사용하여 익명 함수를 간단히 실행  
(람다)

> 기본 화살표 함수 표현식

```
// ES6
// 함수의 인자가 X & {} return 생략(한줄 코드)
let getName = () => 'John Smith';
console.log(getName());

// ES5 변환
let getName = function() {return 'John Smith';}
console.log(getName());
```

> example2

```
let getNameUpper = () => {
  let name = 'Peter Luger'.toUpperCase();
  return name;
}
console.log(getNameUpper());
```

> this 컨텍스트 확인 예제

```
function StockQuoteGeneratorArrow(symbol : string) {
  this.symbol = symbol;
  setInterval(() => {    
    console.log('StockQuoteGeneratorArrow. The price quote for '
    + this.symbol + ' is ' + Math.random());
  }, 1000);
}

let stockQuoteGeneratorArrow = new StockQuoteGeneratorArrow('IBM');

function StockQuoteGeneratorAnonymous(symbol : string) {
  this.symbol = symbol;
  setInterval(function() {
    // this가 가리키는 것은 전역 window 객체
    console.log('StockQuoteGeneratorAnonymous. The price quote for '
    + this.symbol + ' is ' + Math.random());
  }, 1000);  
}

let stockQuoteGeneratorAnonymous = new StockQuoteGeneratorAnonymous('IBM');

== console ==
StockQuoteGeneratorArrow. The price quote for IBM is 0.03468463241586783
StockQuoteGeneratorAnonymous. The price quote for undefined is 0.9298668540562745
StockQuoteGeneratorArrow. The price quote for IBM is 0.06751706640755684
StockQuoteGeneratorAnonymous. The price quote for undefined is 0.8926961741678123
```

=> TypeScript 에서는 화살표 함수 표현식 안에 사용한 this를 함수 선언 밖에 있는  
this와 같도록 조정  
=> StockQuoteGeneratorArrow() 함수에서 symbol 프로퍼티를 선언한 this 객체와 화살표  
함수 표현식 안에 있는 this가 같은 객체를 가리키게 됨

---

<div id="summary"><div>

### Summary

- TypeScript 코드를 TypeScript 컴파일러로 컴파일하면 JavaScript 코드가 됨
- TypeScript에서는 변수나 함수의 인자, 함수의 반환값에 타입을 지정할 수 있음
- 함수를 선언할 때 인자의 기본값(state : string = 'NY')을 지정할 수 있고 생략 가능(dependents?)
- 화살표 함수 표현식은 익명함수를 좀 더 간단하게 사용하기 위한 문법
- 익명 함수에서 this 객체를 사용할 때 가리키는 객체가 애매했던 문제로 화살표 함수 표현식에서  
  해결 됨

---

<div id="b6"></div>

### B.6 클래스
