# TypeScript

#### index

- <a href="#b1"> B.1 Angular 애플리케이션이 TypeScript인 이유 </a>
- <a href="#b2"> B.2 트랜스파일러(==compiler)의 역할</a>
- <a href="#b3"> B.3 TypeScript 시작하기 </a>
- <a href="#b4"> B.4 JavaScript의 상위 집합</a>
- <a href=""> </a>
- <a href=""> </a>

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

<div id="b4"></div>

### B.4 JavaScript의 상위 집합













<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

---
