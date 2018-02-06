import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'stock-search',
  // lastStockSymbol 변수를 동기화하기 위해 양방향 바인딩을 사용
  template: `
    <input type="text" placeholder="Enter stock symbol" [(ngModel)]="lastStockSymbol"/>
    <br> The value of lastStockSymbol is {{ lastStockSymbol}}
  `
})
class StockComponent {
  // lastStockSymbol 변수는 뷰와 컴포넌트를 연결하는 모델이고, 사용자의 입력이나 
  // 프로그램의 코드에 의해 값이 바뀜
  lastStockSymbol: string;

  constructor() {
    setTimeout(() => {
      // 마지막에 입력 한 회사이름을 가져오는 코드는 여기에 작성한다(생략)
      this.lastStockSymbol = 'AAPL';
    }, 2000);
  }
}

@Component({
  selector: 'app',
  template: `
    <stock-search></stock-search>`
})
class AppComponent {
}

@NgModule({
  // NgModel을 사용하기 위해, FormsModel을 불러옴
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, StockComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);