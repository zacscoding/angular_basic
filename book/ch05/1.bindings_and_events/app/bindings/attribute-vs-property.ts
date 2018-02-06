import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app',
  // 1) 프로퍼티 바인딩
  // 2) 어트리뷰트 바인딩
  // 3) <input> 이벤트 핸들러 바인딩
  template: `
    <h3>Property vs attribute bindings</h3>
    <input [value]="greeting"
           [attr.value]="greeting"
           (input)="onInputEvent($event)">
  `
})
class AppComponent {
  greeting: string = 'A value';

  onInputEvent(event: Event): void {
    // Event 객체를 인자로 받아, target 프로퍼티 == 이벤트가 발생한 HTML 엘리먼트
    let inputElement: HTMLInputElement = <HTMLInputElement> event.target;
    console.log(`The input property value = ${inputElement.value}`);
    // 어트리뷰트 값을 getAttribute 함수로 확인
    console.log(`The input attribute value = ${inputElement.getAttribute('value')}`);
    console.log(`The greeting property value = ${this.greeting}`);
  }
  
  // 비구조화 코드
  /*
  onInputEvent({target}): void {
    console.log(`The input property value = ${target.value}`);
    // 어트리뷰트 값을 getAttribute 함수로 확인
    console.log(`The input attribute value = ${target.getAttribute('value')}`);
    console.log(`The greeting property value = ${this.greeting}`);
  }
  */
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
