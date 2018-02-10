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