import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component, Input, OnChanges, SimpleChange, enableProdMode} from "@angular/core";

import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

// 값을 저장 할 객체의 형식을 정의. 이 인터페이스는 ngOnChanges() 에서 사용하고
// 객체의 키는 문자열 타입을 사용하며, 값의 변화를 확인하기 위해 Angular에서 제공하는 SimpleChange 클래스를 사용
interface IChanges {
  [key: string]: SimpleChange
};

@Component({
  selector: 'child',
  styles: ['.child {background: lightgreen;}'],
  template: `
    <div class="child">
      <h2>Child</h2>
      <div>Greeting : {{greeting}}</div>
      <div>User name : {{user.name}}</div>
      <div>Message : <input [(ngModel)]="message"></div>
    </div>
  `
})
class ChildComponent implements OnChanges {
  // AppComponent에서 데이터를 받기 위해 입력 프로퍼티 지정
  @Input() greeting: string;
  @Input() user: { name: string };
  // @Input 어노테이션 지정X => 값이 변경되어 ngOnChanges() 함수는 실행X
  message: string = 'Initial message';

  // 입력 프로퍼티의 값이 변경되면 사용
  ngOnChanges(changes: IChanges) {
    console.log(JSON.stringify(changes, null, 2));
  }
}

@Component({
  selector: 'app',
  styles: ['.parent{background: lightblue;}'],
  template: `
    <div class="parent">
      <h2>Parent</h2>
      <div>Greeting : <input type="text" [value]="greeting" (input)="greeting=$event.target.value"></div>
      <div>User name : <input type="text" [value]="user.name" (input)="user.name=$event.target.value"></div>
      <child [greeting]="greeting" [user]="user"></child>
    </div>
  `
})
class AppComponent {
  greeting: string = "Hello";
  user: { name: string } = {name: 'John'};
}

// Angular 운영모드 활성화
enableProdMode();

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ChildComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);