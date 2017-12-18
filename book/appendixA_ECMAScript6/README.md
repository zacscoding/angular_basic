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

<pre>
  let customer = 'Joe';

  (function() {
      console.log('The name of the customer inside the function is ' + customer);

      if(2 > 1 ) {
        let customer = 'Mary';
        console.log('The name of the customer inside the function is ' + customer);
      }

  })();

  for(let i=0; i<5; i++){
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
</pre>

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
