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
