# ECMA Script6

#### docs

- <a href="http://www.ecma-international.org/ecma-262/6.0/">ES6스펙</a>
- <a href="http://kangax.github.io/compat-table/es6/"> ES6 스펙 지원 상황 </a>
- <a href="https://github.com/oreillymedia/enterprise_web_development">Enterprise Web Development 부록</a>

- <a href="https://es6console.com/">es6 console</a>
- <a href="https://google.github.io/traceur-compiler/demo/repl.html#">Traceur</a>
- <a href="http://babeljs.io/repl">Babel</a>

- <a href="https://github.com/farata/angular2typescript">Book GITHUB</a>

#### index

- <a href="#A2">A2. 템플릿 리터럴</a>
- <a href="#A3">A.3 옵션 인자와 인자 기본값</a>
- <a href="#A4">A.4 변수 스코프</a>
- <a href="#A5">A.5 화살표 함수 표현식과 this</a>
- <a href="#A6">A.6 forEach(), for-in, for-of</a>
- <a href="#A7">A.7 클래스와 상속</a>




<div id="A2"></div>

### A2. 템플릿 리터럴

> 기존 문자열 조합

<pre>
var customerName = "John Smith";
console.log("Hello" + customerName);
</pre>

> 역따옴표를 사용 한 템플릿 리터럴

<pre>
var customerName = "John Smith";
console.log(`Hello ${customerName}`);

function getCustomer() {
  return "Allan Lou";
}

console.log(`Hello ${getCustomer()}`);
</pre>

> 여러 줄에 걸친 문자열 (모든 공백 유지)

<pre>
var message = `Please enter the password that
				has at least 8 characters and
				includes a capital letter`;

console.log(message);
</pre>


> 태그가 붙는 템플릿 스트링

<pre>
function currencyAdjustment (stringParts, region, amount) {
  console.log(stringParts);
  console.log(region);
  console.log(amount);


  var sign;  
  if(region ===1) {
    sign = '$';
  }
  else {
    sign = '\u20AC';
    amount = 0.9 * amount;
  }
  return `${stringParts[0]}${sign}${amount}${stringParts[2]}`;
}

var amount = 100;
var region = 2;
var message = currencyAdjustment`You\'ve earned ${region} ${amount}!`;

console.log(message);

----- console -----
["You've earned "," ","!"]
2
100
You've earned €90!
</pre>

---

<div id="A3"></div>

### A.3 옵션 인자와 인자 기본값
;ES6에서는 함수에 인자가 전달되지 않을 때, 기본값을 설정할 수 있음

> ES5에서 기본 값 체크

<pre>
function calcTaxES5(income, state) {
  state = state || 'Florida';
  console.log('ES5. Calculating tax for the resident of ' + state + ' with the income ' + income);
}
calcTaxES5(50000);

--- console ---
ES5. Calculating tax for the resident of Florida with the income 50000
</pre>

> ES6에서 인자의 기본 값 지정

<pre>
function calcTaxES5(income, state = 'Florida') {  
  console.log('ES6. Calculating tax for the resident of ' + state + ' with the income ' + income);
}
calcTaxES5(50000);

or

function calcTaxES5(income, state = getDefaultState()) {  
  console.log('ES6. Calculating tax for the resident of ' + state + ' with the income ' + income);
}
function getDefaultState() {
  return 'Florida';
}
calcTaxES5(50000);
// 단 calcTaxES5() 함수가 실행 될 때마다, getDefaultState() 실행 됨 => 성능 주의


--- console ---
ES6. Calculating tax for the resident of Florida with the income 50000
</pre>

---

<div id="A4"></div>

### A.4 변수 스코프
; 호이스팅(==변수를 선언한 위치와 관계없이 var 키워드가 스코프의 제일 위로 옮겨져 선언)  
=> let을 도입해 호이스팅에 대한 혼란을 없앰 + this에 대한 애매함도 화살표 함수(arrow function)를 도입해 해결

#### A.4.1 변수 호이스팅

> for문 밖에서 i 접근 :: ES5는 변수 선언을 스코의 제일 위로 끌어올림

<pre>
function foo() {
  for(var i=0; i<10; i++) {

  }
  console.log('i=' + i);
}
foo();

--- console ---
i=10
</pre>

> 변수 선언이 호이스팅되는 예제

<pre>
var customer = 'Joe';

(function() {
  console.log('The name of the customer inside the function is ' + customer);
  /*if(2 > 1 ) {
    var customer = 'Mary';
  }*/

})();
console.log('The name of the customer outside the function is ' + customer);

-- console --
The name of the customer inside the function is Joe
The name of the customer outside the function is Joe
-------------

var customer = 'Joe';

(function() {
  console.log('The name of the customer inside before the function is ' + customer);
  if(2 > 1 ) {
    var customer = 'Mary';
  }
  console.log('The name of the customer inside after the function is ' + customer);  
})();

console.log('The name of the customer outside the function is ' + customer);

--- console ---
The name of the customer inside before the function is undefined
The name of the customer inside after the function is Mary
The name of the customer outside the function is Joe
=> 변수 선언이 선언 범위의 제일 위로 끌어 올려지지만, 초기화는 변수가 선언 된 위치에서 처리
=> 콘솔을 출력하는 시점(before)에서는 초기화 X

</pre>

> 함수 선언의 호이스팅

<pre>
doSomething();

function doSomething() {
  console.log("I'm doing something");
}
--- console ---
I'm doing something
------------------

</pre>

#### A.4.2 let과 const를 사용하는 변수 스코프

> let 변수 선언

```
  let customer = 'Joe';

  (function() {
      console.log('The name of the customer inside the function is ' + customer);

      if(2 > 1 ) {
        let customer = 'Mary';
        console.log('The name of the customer inside the function is ' + customer);
      }

  })();

  for(let i=0; i<5; i++) {
    console.log('i=' + i);
  }

  console.log('i=' + i); // Uncaught SyntaxError: Invalid or unexpected token

--- console ---
The name of the customer inside the function is Joe
The name of the customer inside the function is Mary
i=0
i=1
i=2
i=3
i=4
```

=> const도 let과 접근 범위가 같지만, 상수로 선언되는 차이 존재.

### A.5 화살표 함수 표현식과 this

> 화살표 함수 표현식

<pre>
let sum = (arg1, arg2) => arg1 + arg2;
console.log(sum(1,2));
--- console ---
3
---------------

// 함수 몸체가 여러 줄이면?
(arg1, arg2) => {
  // do something
  return someResult;  
}

// 전달 인자 X
() => {
  // do something
  return someResult;
}

// 전달 인자1개면 괄호 생략 가능
arg1 => {
  // do something
  return someResult;
}
</pre>

> 인자로 전달한 배열의 합계를 구하는 고차 함수 / 배열에서 짝수만 반환하는 고차 함수

<pre>
var myArray = [1,2,3,4,5];
console.log("The sum of myArray elements is " + myArray.reduce((a,b) => a + b)); // 15
console.log("The even numbers in myArray are " + myArray.filter(value=> value%2 == 0));// 2,4

--- console ---
The sum of myArray elements is 15
The even numbers in myArray are 2,4
---------------
</pre>

> 의도와 다르게 동작하는 this

<pre>
function StockQuoteGenerator (symbol) {
  this.symbol = symbol;
  setInterval(function getQuote(){
    console.log('The price quote for ' + this.symbol + ' is ' + Math.random());
  },1000);
}

var stockQuoteGenerator = new StockQuoteGenerator('IBM');

--- console ---
The price quote for undefined is 0.10210848654823068
....
....
---------------
</pre>

=> getQuote() 함수가 선언되는 위치는 StockQuoteGenerator() 함수 안이 아니라   
전역이기 때문에, getQuote() 함수에 사용되는 this는 전역 객체를 가리킴  
=> 전역 객체의 symbol 프로퍼티 값이 없으므로 undefined  
=> that을 이용해 제대로 동작 가능

> 화살표 함수 표현식에서 제대로 동작하는 this

<pre>
function StockQuoteGenerator (symbol) {
  this.symbol = symbol;  
  // 함수가 실행되는 컨텍스트를 this로 연결함
  setInterval(() => {
    console.log('The price quote for ' + this.symbol + ' is ' + Math.random());
  },1000);  
}
var stockQuoteGenerator = new StockQuoteGenerator('IBM');

--- console ---
The price quote for IBM is 0.10210848654823068
...
---------------
</pre>


---


### A.5.1 나머지 연산자(Rest Opterator), 전개 연산자(Spread Opterator)

- 기존  
가변 인자를 사용하기 위해 arguments 객체를 사용(배열과 비슷 BUT 배열은 아님)  
- 변경 (...) 으로 사용   
=> 나머지 연산자는 전달 인자의 개수가 고정되지 않은 함수 & 마지막에 전달  
```function processCustomers (... customers) { ... } ```

> 나머지 연산자 예제  

```
// ES5 and arguments object
  function calcTaxES5(){
      console.log("ES5. Calculating tax for customers with the income ",
                             arguments[0]);   // income is the first element
      // extract an array starting from 2nd element
      var customers = [].slice.call(arguments, 1);
      customers.forEach(function (customer) {
          console.log("Processing ", customer);
      });
  }
  calcTaxES5(50000, "Smith", "Johnson", "McDonald");
  calcTaxES5(750000, "Olson", "Clinton");
// rest operator
  function calcTaxES6(income, ...customers) {
      console.log("ES6. Calculating tax for customers with the income ", income);
      customers.forEach(function (customer) {
          console.log("Processing ", customer);
      });
  }
  calcTaxES6(50000, "Smith", "Johnson", "McDonald");
  calcTaxES6(750000, "Olson", "Clinton");

  ------------------------- console --------------------------------
  ES5. Calculating tax for customers with the income  50000
  Processing  Smith
  Processing  Johnson
  Processing  McDonald
  ES5. Calculating tax for customers with the income  750000
  Processing  Olson
  Processing  Clinton
  ES6. Calculating tax for customers with the income  50000
  Processing  Smith
  Processing  Johnson
  Processing  McDonald
  ES6. Calculating tax for customers with the income  750000
  Processing  Olson
  Processing  Clinton  
  ------------------------------------------------------------------
```

> 전개 연산자

```
function calcTaxSpread(customer1, customer2, customer3, income) {
  console.log('ES6. Calculating tax for customers with the income ', income);
  console.log('Processing ', customer1, customer2, customer3, income);
}

var customers = ['Smith', 'Johnson', 'McDonald'];
calcTaxSpread(...customers, 50000); //전개 연산자

--- console ---
ES6. Calculating tax for customers with the income  50000
Processing  Smith Johnson McDonald 50000
---------------
```

=> 나머지 연산자 == 가변 인자를 하나의 배열로 (위치는 항상 마지막)
=> 전개 연산자 == 배열의 각 항목을 개별 변수로 분리 (위치는 상관 X)


#### A.5.2 제너레이터(Generators)
; 일반적으로 JavaScript 함수는 한 번 실행되면 중간에 멈추지X  
=> 제너레이터 함수는 몇 번이고 멈출 수 있고, 멈춘 시점을 다시 이어 실행 할 수 있음  
+ 다른 제너레이터 함수에게 조작 권한을 넘길 수 있음

> 제너레이터 eg

```
function* doSomething() {
  console.log('Started processing');
  yield; // 함수 실행이 멈추고 제너레이터 객체 외부에서
         // 제너레이터의 next() 함수를 호출하면 멈췄던 함수가 실행
  console.log('Resumed processing');
}
var iterator = doSomething();
iterator.next(); // doSomething()시작 -> yield만나기 전까지
console.log('after next()');
iterator.next(); // doSomething() 재시작
--- console ---
Started processing
after next()
Resumed processing
---------------
```

> 제너레이터 함수 예제

```
function* getStockPrice(symbol) {
  while(true) {
    yield Math.random() * 100;
    console.log(`resuming for ${symbol}`);
  }
}

// 1. 제너레이터 객체 생성 & 인자로 'IBM' 전달 BUT 함수 실행X
let generator = getStockPrice('IBM');

// 2. 기준 가격을 15달러, 초기 주가는 100달러로 설정
const limitPrice = 15;
let price = 100;

// 3. 기준 가격인 15달러가 될 때까지 요청을 반복
while(price > limitPrice) {
  // 4. 주가를 다시 요청하고 현재 주가를 콘솔에 출력
  price = generator.next().value;
  console.log(`The generator returned ${price}`);
}

//5.
console.log(`buying at ${price} !!!`);

--- console ---
The generator returned 78.95468262219512
resuming for IBM
The generator returned 56.325541781142576
resuming for IBM
The generator returned 6.752643829726246
buying at 6.752643829726246 !!!
----------------------------------------
```

#### A.5.3 비구조화(Destructuring)
; 객체를 분해하는 것을 뜻(<=> 객체의 인스턴스를 만드는 것 == 메모리에 생성)


```
function getStock() {
  return {
    symbol : 'IBM',
    price : 100.00
  };
}
/*
// ES5
var stock = getStock();
var symbol = stock.symbol;
var price = stock.price;
*/

let {symbol, price} = getStock();
console.log(`The price of ${symbol} is ${price}`);

------ console ---------
The price of IBM is 100
-------------------------

--------------------------------------------------------

let {sym, price} = getStock();
console.log(`The price of ${sym} is ${price}`);
=> The price of undefined is 100

--------------------------------------------------------

let {symbol : sym, price} = getStock();
console.log(`The price of ${sym} is ${price}`);
=> The price of IBM is 100

--------------------------------------------------------

let {symbol : sym, price, stockExchange} = getStock();
console.log(`The price of ${sym} is ${price} ${stockExchange}`);
=> The price of IBM is 100 undefined

--------------------------------------------------------

let {symbol : sym, price, stockExchange = "NASDAQ"} = getStock();
console.log(`The price of ${sym} is ${price} ${stockExchange}`);
=> The price of IBM is 100 NASDAQ

--------------------------------------------------------

```

> 중첩된 객체에 비구조화 할당 사용하기

```
let msft = {
  symbol : 'MSFT',
  lastPrice : 50.00,
  exchange : {
    name : 'NASDAQ',
    trandingHours : '9:30am-4pm'
  }
};

function printStockInfo(stock) {
  let {symbol, exchange : {name} } = stock;
  console.log(`The ${symbol} stock is traded at ${name}`);
}

printStockInfo(msft);

--- console ---
The MSFT stock is traded at NASDAQ
---------------
```

**배열분해**  

```
let [name1, name2] = ['Smith', 'Cliton'];
console.log(`name1 = ${name1} , name2 = ${name2}`);
=> name1 = Smith , name2 = Cliton

// 두 번째 항목만 추출
let [, name2] = ['Smith', 'Cliton'];
console.log(`name1 = ${name1} , name2 = ${name2}`);

// 배열 분해
function getCustomers () {
  return ['Smith', 'Zac', 'Coding', 'Gonzales'];
}

let [firstCustomer, , , lastCustomer] = getCustomers();
console.log(`The first customer : ${firstCustomer} and the last one is ${lastCustomer}`);
=> The first customer : Smith and the last one is Gonzales

// 배열 분해 + 나머지 연산자
let customers = ['Smith', 'Clinton', 'Lou', 'Gonzales'];
let [firstCust, secondCust, ... otherCust] = customers;

console.log(`first : ${firstCust} , second : ${secondCust}`);
console.log(`Others : ${otherCust}`);

// 함수를 선언할 때 적용
function processFirstTwoCustomers([firstCust, secondCust, ... otherCust]) {
  console.log(`first : ${firstCust} , second : ${secondCust}`);
  console.log(`Others : ${otherCust}`);
}
processFirstTwoCustomers(customers);


--- Console --------------------
first : Smith , second : Clinton
Others : Lou,Gonzales
first : Smith , second : Clinton
Others : Lou,Gonzales
-------------------------------
```

---

<div id="A6"></div>

### A.6 forEach(), for-in, for-of

#### A.6.1 forEach()

```
var numbersArray = [1,2,3,4];
numbersArray.description = 'four numbers';

numbersArray.forEach((n) => console.log(n));
----------------- console -------------------
1
2
3
4
---------------------------------------------
```

#### A.6.2 for-in  

```
var numbersArray = [1,2,3,4];
numbersArray.description = 'four numbers';

// 프로퍼티의 이름과 값으로 처리
// 컬렉션 데이터 + 프로퍼티 모두 순회
for(let n in numbersArray) {
  console.log(n);// 문자열로 출력  
}
for(let n in numbersArray) {
  console.log(numbersArray[n]);
}
--- console ---
0
1
2
3
description
1
2
3
4
four numbers
---------------
```

#### A.6.3 for-of
;컬렉션의 값을 기준으로 순회 && 데이터 컬렉션에 속하지 않은 프로퍼티는 무시  

```
var numbersArray = [10,20,30,40];
numbersArray.description = 'four numbers';

console.log('Running for of for the entire array');
for(let n of numbersArray) {
  console.log(n);
}

console.log('Running for of with a break');
for(let n of numbersArray) {
  if(n>20) break;
  console.log(n);
}

--- console ---
Running for of for the entire array
10
20
30
40
Running for of with a break
10
20
---------------
```

=> for-of 루프는 Array, Map, Set과 같이 반복 가능한(iterable) 객체에는 모두 사용 가능  

```
// 문자열 순회에 사용
for(let char of "John") {
  console.log(char);
}
```

---

<div id="A7"></div>

### A.7 클래스 상속
; ES6에 클래스 문법이 정식으로 도입

> Tax객체를 상속받아 NJTax 객체를 구현하는 예제

```
function Tax() {
  // Tax 객체에서 사용하는 코드  
}

function NJTax() {
  // New Jersey Tax 객체에서 사용하는 코드
}

// NJTax가 Tax를 상속받도록 prototype으로 연결
NJTax.prototype = new Tax();

var njTax = new NJTax();
```

> extends 키워드 도입

```
// 부모, 슈퍼 클래스
class Tax {
    // Tax 객체에서 사용하는 코드
}
// 자식, 서브 클래스
class NJTax extends Tax {
    // New Jersey Tax 객체에서 사용하는 코드
}

var njTax = new NJTax();
// is-a 관계 :: NJTax is a Tax
```

```Class 선언은 호이스팅이 되지 않으므로, 스크립트의 제일 위에 선언 해야 함```

> 기존 클래스 메소드 정의

```
function Tax() {
  // Tax 객체에서 사용하는 코드
}
Tax.prototype = {
  calcTax : function() {
    // 세금을 계산하는 코드
  }
}

==> ES6로 개선 된 코드

class Tax() {
  calcTax() {
    // 세금을 계산하는 코드
  }
}
```

```ES6에서 멤버필드는 지원하지 X (TypeScript는 지원)```

#### A.7.1 생성자

> constructors() 메소드로 정의

```
class Tax {
  constructor(income) {
    // this == 객체 자체
    this.income = income;
  }
}

var myTax = new Tax(5000);
console.log(myTax);
```

> E.g : NJTax 클래스를 만들면ㅅ더 생성자에 50,000을 인자로 전달

```
class Tax {
  constructor(income) {
    console.log('Tax.constructor(income)',income);
    this.income = income;
  }
}

class NJTax extends Tax {
  // New Jersey Tax 객체에서 사용하는 코드
}

var njTax = new NJTax(50000);
console.log(`The income in njTax insteance is ${njTax.income}`);

--- console ---
Tax.constructor(income) 50000
The income in njTax insteance is 50000
---------------
```

#### A.7.2 정적 변수(static variables)
























ㅁㅇㄴㄻㄴㅇㄻ


---
