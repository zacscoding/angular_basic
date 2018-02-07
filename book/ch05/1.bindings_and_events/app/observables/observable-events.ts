import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
// rxjs/Rx를 이용해 모든 함수를 불러오거나 특정 함수를 지정
// => 애플리케이션 최적화를 위해 사용하는 함수만 불러오는 게 좋음
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app',
  // <input> 엘리먼트는 컴포넌트 프로퍼티 searchInput으로 바인딩되서 폼 컨트롤로 동작
  template: `
    <h2>Observable events demo</h2>
    <input type="text" placeholder="Enter stock" [formControl]="searchInput">
  `
})
class AppComponent {
  searchInput: FormControl = new FormControl('');

  constructor() {
    this.searchInput.valueChanges
    // <input> 엘리먼트는 다음 이벤트를 바로 발생시지 않고 500MS 지연
    .debounceTime(500)
    // 옵저버블 스트림을 구독
    .subscribe(stock => this.getStockQuoteFromServer(stock));
  }

  getStockQuoteFromServer(stock: string) {
    console.log(`The price of ${stock} is ${100 * Number(Math.random().toFixed(4)) }`);
  }
}

@NgModule({
  // 반응형 폼 모듈을 앱 모듈에 불러옴
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
