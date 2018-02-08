import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {TemperaturePipe} from "./temperature.pipe";

@Component({
  selector: 'app',
  // temperature 파이프 + number 파이프 체이닝 (정수 한 자리 반드시 표시 & 소수점 최대 2번쨰 자리까지
  template: `
    <input type='text' value="0" placeholder="Enter temperature" [(ngModel)]="temp">
    <button (click)="toggleFormat()">Toggle Format</button>
    <br>In {{ targetFormat }} this temperature is {{ temp | temperature: format | number:'1.1-2'}}
  `
})
class AppComponent {
  temp: number = 0;
  toCelsius: boolean = false;
  targetFormat: string = 'Fahrenheit';
  format: string = 'CtoF';

  toggleFormat() {
    this.toCelsius = !this.toCelsius;
    this.format = this.toCelsius ? 'FtoC' : 'CtoF';
    this.targetFormat = this.toCelsius ? 'Celsius' : 'Fahrenheit';
  }
}

@NgModule({
  // ngModel을 사용하기 위해 FormsModule을 사용
  imports: [BrowserModule, FormsModule],
  // 커스텀 파이프를 모듈 선언에 추가
  declarations: [AppComponent, TemperaturePipe],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);

