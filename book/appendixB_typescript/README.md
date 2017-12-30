# TypeScript

<div id="index"></div>

#### index

- <a href="#b1"> B.1 Angular 애플리케이션이 TypeScript인 이유 </a>
- <a href="#b2"> B.2 트랜스파일러(==compiler)의 역할</a>
- <a href="#b3"> B.3 TypeScript 시작하기 </a>
- <a href="#b4"> B.4 JavaScript의 상위 집합</a>
- <a href="#b5"> B.5 타입 지정</a>
- <a href="#b6"> B.6 클래스</a>
- <a href="#b7"> B.7 제네릭(Generics) </a>
- <a href="#b8">B.8 인터페이스(Interfaces)</a>
- <a href="#b9">B.9 클래스 메타데이터 추가하기, 어노테이션</a>
- <a href="#b10">B.10 타입 정의 파일</a>
- <a href="#b11">B.11 TypeScript&Angular 개발 단계 훑어보기</a>
- <a href="#summary">정리</a>


### B.7

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

<div id="b6"></div>

### B.6 클래스
; class 키워드는 코딩을 단순하게 하는 문법 설탕(syntactic sugar)일 뿐  
=> class와 extends 키워드를 사용해도 JavaScript로 변환하면 결국 프로토타입을 활용 한 상속

> TypeScript 클래스

```
class Person {
  firstName : string;
  lastName : string;
  age : number;
  ssn : number;
}

var p = new Person();
p.firstName = 'John';
p.lastName = 'Smith';
p.age = 29;
p.ssn = "123-90-4567";

------------ JS ------------
var Person = (function () {
    function Person() {
    }
    return Person;
}());
var p = new Person();
p.firstName = 'John';
p.lastName = 'Smith';
p.age = 29;
p.ssn = "123-90-4567";
```

> Person + 생성자

```
class Person {
  firstName : string;
  lastName : string;
  age : number;
  ssn : string;

  constructor(firstName:string, lastName:string, age:number, ssn:string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.ssn = ssn;
  }
}

var p = new Person('John', 'Smith', 29, '123-90-4567');

------------ JS ------------
// Person 함수를 클로저(closure)로 구성
var Person = (function () {
    function Person(firstName, lastName, age, ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.ssn = ssn;
    }
    return Person;
}());

var p = new Person('John', 'Smith', 29, '123-90-4567');
```

#### B.6.1 접근 제한자

- public(기본, 자유롭게 접근)
- protected(해당 클래스 or 자식 클래스에서 접근)  
- private(해당 클래스)


> ssn을 private로 선언1) 멤버필드

```
class Person {
  firstName : string;
  lastName : string;
  age : number;
  private _ssn : string;

  constructor(firstName:string, lastName:string, age:number, ssn:string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this._ssn = ssn;
  }
}

let p = new Person('John', 'Smith', 29, '123-90-4567');
console.log('Last Name' + p.lastName + ' SSN : ' + p._ssn); // error
```

> ssn을 private로 선언2) 생성자

```
// 자동으로 접근 제한자 + 전달된 인자로 초기값을 할당
class Person {
  constructor(public firstName:string, public lastName:string, public age:number, private ssn:string) {    
  }
}
let p = new Person('John', 'Smith', 29, '123-456-789');
console.log('Last Name' + p.lastName + ' SSN : ' + p.ssn); // error

------------ JS ------------
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age, ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.ssn = ssn;
    }
    return Person;
}());
var p = new Person('John', 'Smith', 29, '123-456-789');
console.log('Last Name' + p.lastName + ' SSN : ' + p.ssn); // error
```

#### B.6.2 메소드

> 메소드 정의

```
class MyClass {
    doSomething(howManyTimes: number): void {
        // do something
    }
}

let mc = new MyClass();
mc.doSomething(5);

----------- JS -----------
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.doSomething = function (howManyTimes) {
        // do something
    };
    return MyClass;
}());
var mc = new MyClass();
mc.doSomething(5);
```

> 정적 클래스 멤버(static)

```
class MyClass {
    static doSomething(howManyTimes: number): void {
        // do something
    }
}
MyClass.doSomething(5);
// 객체로 하려면 this를 사용해야 함
----------- JS -----------
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.doSomething = function (howManyTimes) {
        // do something
    };
    return MyClass;
}());
MyClass.doSomething(5);
```

> Setter & Getter

```
class Person {
  // ssn 생략 가능
  constructor(public firstName:string, public lastName:string, public age:number, private _ssn?:string) {

  }

  // getter
  get ssn() : string {
    return this._ssn;
  }

  // setter
  set ssn(value : string) {
    this._ssn = value;
  }
}

let p = new Person('John', 'Smith', 29);
p.ssn = '456-70-1234'; // 세터 메소드 실행

console.log('Last Name : ' + p.lastName + 'SSN : ' + p.ssn);

----------- JS -----------
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age, _ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this._ssn = _ssn;
    }
    Object.defineProperty(Person.prototype, "ssn", {
        get: function () {
            return this._ssn;
        },
        set: function (value) {
            this._ssn = value;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var p = new Person('John', 'Smith', 29);
p.ssn = '456-70-1234';
console.log('Last Name : ' + p.lastName + 'SSN : ' + p.ssn);
alert('Last Name : ' + p.lastName + 'SSN : ' + p.ssn);
```

#### B.6.3 상속
; TypeScript의 extends -> JavaScript의 프로토타입을 활용 한 상속

> 클래스 상속

```
class Person {
  constructor(public firstName:string, public lastName:string, public age:number, private _ssn?:string) {
  }  
}
class Employee extends Person {

}

----------- JS -----------
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age, _ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this._ssn = _ssn;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Employee;
}(Person));
```

> Employee에 department 프로퍼티 추가

```
class Person {
  constructor(public firstName:string, public lastName:string, public age:number, private _ssn?:string) {
  }  
}
class Employee extends Person {
  department : string; // department 프로퍼티 추가

  constructor(firstName : string, lastName : string, age : number, _ssn : string, department : string) {
    super(firstName, lastName, age, _ssn); // 반드시 호출
    this.department = department;
  }
}

----------- JS -----------

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age, _ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this._ssn = _ssn;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Employee.prototype.constuctor = function (firstName, lastName, age, _ssn, department) {
        _this = _super.call(this, firstName, lastName, age, _ssn) || this;
        this.department = department;
    };
    return Employee;
}(Person));
```


---

<div id="b7"> </div>

### B.7 제네릭(Generics)
; 함수가 실행되는 시점에서 명확한 타입을 지정해서 사용하고 싶을 때 제네릭을 사용

> 제네릭 배열

```
class Person {
  name : string;
}

class Employee extends Person {
  department : number;
}

class Animal {
  breed : string;
}

let workers : Array<Person> = [];
workers[0] = new Person();
workers[1] = new Employee();
// Type 'Animal' is not assignable to type 'Person'. Property 'name' is missing in type 'Animal'.
workers[2] = new Animal(); // 컴파일 에러!

----------- JS -----------

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Employee;
}(Person));
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var workers = [];
workers[0] = new Person();
workers[1] = new Employee();
workers[2] = new Animal(); // 컴파일 에러!

```

> 모든 타입 가능하게 하려면

``` let workes : Array<any> = [];```

> 메소드에 제네릭을 사용하는 예제

```
function saySomething<T> (data : T) {

}

saySomething<string>('Hello');
// Error :: Argument of type '1' is not assignable to parameter of type 'string'.
saySomething<string>(1);

----------- JS -----------

function saySomething(data) {
}
saySomething('Hello');
saySomething(1);
```

=> 제네릭 타입은 컴파일 타임에만 유효!!

---

<div id="b8"></div>

### B.8 인터페이스(Interfaces)
; Interface는 ES6에서도 표준으로 자리잡지 못함(필요는 하지만)  
=> TypeScript 자체적으로 인터페이스 기능을 제공

> TypeScript의 Interface는 아래와 같은 용도로 사용 됨  
- 커스텀 타입으로 사용  
=>
- 추상 클래스로 사용  
=>

#### B.8.1 커스텀 타입으로 사용하기

> 인터페이스 정의

```
// 인터페이스 형태를 프로퍼티로 정의
interface IPerson {
  firstName : string;
  lastName : string;
  age : number;
  ssn? : string; // 생략 가능
}

class Person {
  // 생성자에 IPersion 타입을 인자로 받도록 수정
  constructor(public config : IPerson) {
  }
}

// IPerson 인터페이스의 형태에 맞게 aPerson 객체를 생성
// 객체 리터럴 문법을 사용
let aPerson : IPerson = {
  firstName : 'John',
  lastName : 'Smith',
  age : 29
}

// Person 객체의 인스턴스를 새로 만들면서 IPerson 타입의 객체를 인자로 전달
let p = new Person(aPerson);
console.log('Last Name : ' + p.config.lastName);

----------- JS -----------

var Person = /** @class */ (function () {
    function Person(config) {
        this.config = config;
    }
    return Person;
}());
var aPerson = {
    firstName: 'John',
    lastName: 'Smith',
    age: 29
};
var p = new Person(aPerson);
console.log('Last Name : ' + p.config.lastName);
```

=> aPerson 생성 시 객체 리터럴 사용 & 이 객체 리터럴과 IPerson이 호환되는 타입인지 체크


### B.8.2 추상 클래스로 사용하기
; implements 키워드를 통해 이용

> 정규직(연봉) + 계약직(시급)에 따른 급여 인상 계산

```
interface IPayable {
  increasePay(percent : number) : boolean
}

class Person {
  constructor(){

  }
}

class Employee extends Person implements IPayable {
  increasePay(percent : number) : boolean {
    console.log('Increasing salary by ' + percent);
    return true;
  }
}

class Contractor implements IPayable {
  increaseCap : number = 20;
  increasePay(percent : number) : boolean {
    if(percent < this.increaseCap) {
        console.log('Increasing hourly rate by ' + percent);
        return true;
    }
    else {
      console.log('Sorry, the increase cap for constractor is ' + this.increaseCap);
      return false;
    }
  }
}

let workers : Array<IPayable> = [];
workers[0] = new Employee();
workers[1] = new Contractor();

workers.forEach(worker => worker.increasePay(30));
```

> JS CODE

```
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Employee.prototype.increasePay = function (percent) {
        console.log('Increasing salary by ' + percent);
        return true;
    };
    return Employee;
}(Person));
var Contractor = /** @class */ (function () {
    function Contractor() {
        this.increaseCap = 20;
    }
    Contractor.prototype.increasePay = function (percent) {
        if (percent < this.increaseCap) {
            console.log('Increasing hourly rate by ' + percent);
            return true;
        }
        else {
            console.log('Sorry, the increase cap for constractor is ' + this.increaseCap);
            return false;
        }
    };
    return Contractor;
}());
var workers = [];
workers[0] = new Employee();
workers[1] = new Contractor();
workers.forEach(function (worker) { return worker.increasePay(30); });
```


#### B.8.3 실행할 수 있는 인터페이스
; 익명 함수를 이용해 실행할 수 있는 인터페이스(callable interface)를 정의할 수 있음

> 익명 함수를 사용하는 인터페이스

```
// 익명함수를 사용해서 실행할 수 있는 인터페이스 정의
interface IPayable {
  (percent : number) : boolean;
}

class Person {
  // IPayable 인터페이스를 인자로 받아서 validator 프로퍼티로 할당
  constructor (private validator : IPayable) {
  }

  //this.validator는 생성자에 전달 된 IPayable 인터페이스의 익명 함수
  increasePay(percent : number) : boolean {
    return this.validator(percent);
  }
}

// 정규직 연봉을 인상하는 함수
const forEmployees : IPayable = (percent) => {
  console.log('Increasing salary by ' + percent);
  return true;
};

// 계약직 수당을 인상하는 함수
const forContractors : IPayable = (percent) => {
  const increaseCap : number = 20;

  if (percent < this.increaseCap) {
      console.log('Increasing hourly rate by ' + percent);
      return true;
  }
  else {
      console.log('Sorry, the increase cap for constractor is ' + this.increaseCap);
      return false;
  }
}

// Person 클래스에 각각 다른 함수를 인자로 전달해 인스턴스 생성
const workers : Array<Person> = [];
workers[0] = new Person(forEmployees);
workers[1] = new Person(forContractors);

// 각 인스턴스에서 increasePay() 메소드를 호출
workers.forEach(function (worker) { return worker.increasePay(30); });
```

---

<div id="b9"></div>

### B.9 클래스 메타데이터 추가하기, 어노테이션
; 메타데이터(metadata)는 일반적으로 '데이터에 대한 데이터'를 뜻
=> 이 책에서는 '코드를 설명하는 데이터'라는 의미로 메타데이터 사용

```
@Component({
  // HTML 문서에 컴포넌트가 위치할 셀렉터를 지정
  // or 컴포넌트를 렌더링할 템플릿을 지정할 수 있음
  // 스타일도 여기에 지정  
})

class HelloWorldComponent {
  // 컴포넌트 로직은 여기에 작성
}
```

=> 어노테이션의 내용 파싱 -> 브라우저에서 동작하는 코드로 만들어주는  
어노테이션 처리기가 필요(이 책에서는 Angular 컴파일러인 ngc가 이 역할을 담당)  

```import {Component} from '@angular/core';```


---

<div id="b10"></div>

### B.10 타입 정의 파일
; JS 라이브러리 or 프레임워크를 TypeScript에서 사용하려면 tsd or  
Typings와 같은 타입 정의 매니저로 타입 정의 파일을 설치해서 사용해야 함  

=> TypeScript 2.0 버전부터는 타입 정의 매니저를 따로 사용할 필요X  
=> npmjs.org 사이트에 있는 npm 패키지를 살펴보면 @types라는 접두사가 붙은 패키지  
(개발자들이 많이 사용하는 JS 라이브러리를 TypeScript에서도 사용할 수 있도록 TypeScript측  
에서 타입 정의 파일을 제공)

> jQuery 라이브러리를 TypeScript에서 사용하기

```
yarn add -D @types/jQuery
```

=> jQuery에 대한 타입 정의 파일을 node_modules/@types 폴더 아래 설치하고,  
package.json에 개발 의존성 목록으로 추가함

<br /><br />

**코딩 스타일 맞추기, TSLint**  
https://www.npmjs.com/package/tslint


> TSLint 전역 설치

```npm install -g tslint```

> TSLint 현재 프로젝트에만 설치

```yarn add tslint```

---

<div id="b11"></div>

### B.11 TypeScript&Angular 개발 단계 훑어보기

1. 프로젝트 폴더 생성
2. package.json 파일에 APP에서 사용하는 패키지 목록 작성
3. npm install or yan install 명령을 실행해 package.json 파일에 작성 한  
패키지를 설치  
4. 애플리케이션 코드 작성  
5. SystemJS 로더를 사용해 브라우저에 애플리케이션을 실행.  
(SystemJS 로더는 TypeScript로 작성한 코드를 JS 코드로 변환하는 기능도 수행)  
6. Webpack을 사용해 애플리케이션 코드와 리소스를 압축하고 번들링  
7. npm 스크립트를 사용해서 애플리케이션 배포 폴더로 복사  

---

<div id="summary"><div>

### Summary

- TypeScript 코드를 TypeScript 컴파일러로 컴파일하면 JavaScript 코드가 됨
- TypeScript에서는 변수나 함수의 인자, 함수의 반환값에 타입을 지정할 수 있음
- 함수를 선언할 때 인자의 기본값(state : string = 'NY')을 지정할 수 있고 생략 가능(dependents?)
- 화살표 함수 표현식은 익명함수를 좀 더 간단하게 사용하기 위한 문법
- 익명 함수에서 this 객체를 사용할 때 가리키는 객체가 애매했던 문제로 화살표 함수 표현식에서  
  해결 됨
- 클래스 멤버에 접근하는 권한을 제어하기 위해 접근 제한자를 사용할 수 있지만, Java나 C#처럼 엄격X  
- Angular 어플리케이션은 ES5,6 버전의 JS도 사용가능하지만, TypeScript가 가장 효율적
