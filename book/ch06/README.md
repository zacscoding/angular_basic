# ch06 컴포넌트 통신  

## 이장에서 다루는 내용  

- 컴포넌트 결합도 낮추기
- 부모-자식 컴포넌트 사이에서 데이터 주고 받기
- 중개자 패턴(Mediator pattern)
- 컴포넌트 생명주기
- Angular 변화 감지기 동작 방식

## Index

- <a href="#6.1">컴포넌트끼리 통신하기</a>

<div id="6.1"></div>

## 6.1 컴포넌트끼리 통신하기  

![6-1컴포넌트구조](./pics/[6-1]컴포넌트_구조.png)

- 1컴포넌트는 모든 컴포넌트를 포함
- 2컴포넌트는 컴포넌트4,5포함
- 7,8 컴포넌트는 같은 계층  

### 6.1.1 입력 프로퍼티와 출력 프로퍼티  

- 입력 : 컴포넌트 밖에서 들어오는 데이터는 컴포넌트 프로퍼티에 바인딩할 수 있는데,  
이때 이 데이터를 누가 전해주는 지 컴포넌트가 알 필요는 없으며 어떤 형식의 데이터인지만 필요  
- 출력 : 출력 프로퍼티로 이벤트를 보내는 방법을 사용  



**입력 프로퍼티**  

> app/input_output/input-property-binding.ts  

```
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component, Input} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'order-processor',
  template: `
    Buying {{ quantity }} shares of {{ stockSymbol }}
  `,
  styles: [`:host {
    background: cyan;
  }`]
})
class OrderComponent {
  // 입력 프로퍼티를 2개 선언
  @Input() stockSymbol: string;
  @Input() quantity: number;
}

@Component({
  selector: 'app',
  // AppComponent의 stock 프로퍼티를 OrderComponent의 stockSymbol 프로퍼티로 바인딩
  // OrderComponent의 quantity 변수는 바인딩하지 않고 직접 값을 지정
  template: `
    <input type="text" placeholder="Enter stock (e.g. IBM)"
           (input)="onInputEvent($event)">
    <br/>
    <order-processor [stockSymbol]="stock" quantity="100"></order-processor>
  `
})
class AppComponent {
  stock: string;

  // 사용자가 AppComponent의 입력 필드에 값을 입력하면 부모 컴포넌트의  
  // onInputEvent() 함수가 실행되고, 인자로 받은 이벤트 객체에서 target.value 프로퍼티를 참조해서
  // 클래스 변수 stock에 할당
  onInputEvent({target}): void {
    this.stock = target.value;
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, OrderComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
```

**입력 프로퍼티의 값이 변경되는 시점 가로채기**  
=> 입력 프로퍼티에 setter를 사용  

> input-property-binding-getter-setter.ts  

```
@Component({
  selector: 'order-processor',
  template: `
    Buying {{ quantity }} shares of {{ stockSymbol }}
  `,
  styles: [`:host {
    background: cyan;
  }`]
})
class OrderComponent {
  private _stockSymbol: string;
  @Input() quantity: number;

  @Input()
  set stockSymbol(value: string) {
    this._stockSymbol = value;
    if (this._stockSymbol !== undefined) {
      console.log(`Sending a Buy order to NASDAQ : ${this._stockSymbol} ${this.quantity}`);
    }
  }

  get stockSymbol(): string {
    return this._stockSymbol;
  }
}
```  

=> 3장에서는 컴포넌트에 데이터를 전달하기 위해 ActivatedRoute를 사용  
=> 위의 경우에는 생성자 함수에 인자로 전달  
=> @input() 어노테이션을 사용하면, 두 컴포넌트가 부모-자식 관계 & 같은 라우터  
안에 있을 때 생성자를 통하지 않고 컴포넌트 프로퍼티를 직접 바인딩 할 수 있음

**출력 프로퍼티와 커스텀 이벤트**  
; 컴포넌트는 EventEmitter 객체를 사용해서 커스텀 이벤트를 발생 시킬 수 있음  
=> 컴포넌트 안 or 부모 계층에서 처리할 수 있음  
=> EventEmitter는 RxJS로 구현된 Subject 클래스의 서브 클래스 & 옵저버블, 옵저버 지원  
=> emit()함수를 사용해 커스텀이벤트를 옵저버블 스트림으로 발생  
subscribe() 함수를 옵저버블 스트림을 구독해서 처리할 수 있음  



> output-property-bindings.ts  

```
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component, Output, EventEmitter} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

// 주가 정보를 표현할 TypeScript 인터페이스 정의. 일반 객체 대신 인터페이스를 사용하면,
// 인터페이스 형식이 맞지 않는 데이터가 들어왔을 때 에러를 발생시키므로 문제를 쉽게 찾음
interface IPriceQuote {
  stockSymbol: string;
  lastPrice: number;
}

@Component({
  selector: 'price-quoter',
  // 회사이름과 주가를 컴포넌트 UI에 표시. 주가는 CurrentPipe를 사용해서 통화 형식으로 표시
  template: `
    <strong>Inside PriceQuoterComponent : {{ stockSymbol }} {{ price | currency: 'USD' : true : '1.2-2' }}</strong>
  `,
  styles: [`:host {
    background: cyan;
  }`]
})
class PriceQuoterComponent {
  // 출력 프로퍼티로 지정된 lastPrice는 EventEmitter 클래스를 사용하며, 이 프로퍼티에서 보내는 이벤트는
  // 부모 컴포넌트가 받음(이름을 변경하고 싶으면 어노테이션안에 사용 @Output('last-price-event') && 부모 컴포넌트 변경
  @Output() lastPrice: EventEmitter<IPriceQuote> = new EventEmitter<IPriceQuote>();
  // 회사이름은 하드코딩
  stockSymbol: string = 'IBM';
  price: number;

  constructor() {
    // 매초마다 랜덤 값으로 주가를 생성하고, priceQuote 객체에 저장
    setInterval(() => {
      let priceQuote: IPriceQuote = {
        stockSymbol: this.stockSymbol,
        lastPrice: 100 * Math.random()
      };

      this.price = priceQuote.lastPrice;
      // 새로운 값이 생성될 때마다 출력 프로퍼티를 통해 이벤트를 보냄
      this.lastPrice.emit(priceQuote);
    }, 1000);
  }
}

@Component({
  selector: 'app',
  // price-quoter 태그는 PriceQuoterComponent를 의미하며, 이 태그에서 lastPrice 이벤트를 처리하는
  // priceQuoteHandler() 함수는 이벤트 객체에서 주가의 정보를 가져와 화면에 표시
  // lastPrice는 자식 컴포넌트에서 출력 프로퍼티로 지정된 클래스 변수 이름이면서, 부모 컴포넌트에서 사용하는 이벤트 이름
  template: `
    <price-quoter (lastPrice)="priceQuoteHandler($event)"></price-quoter>
    <br>
    <p>App Component received : {{ stockSymbol }} {{ price | currency: 'USD' : true : '1.2-2' }} </p>
  `
})
class AppComponent {
  stockSymbol: string;
  price: number;

  priceQuoteHandler(event: IPriceQuote) {
    this.stockSymbol = event.stockSymbol;
    this.price = event.lastPrice;
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, PriceQuoterComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```  

=> AppComponent의 이벤트 핸들러는 IPriceQuote 타입의 이벤트 객체를 인자로 받아  
stockSymbol과 lastPrice의 값을 가져오는데, 이 값들은 컴포넌트 클래스 변수에 할당되어  
템플릿에 표시










<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

---
