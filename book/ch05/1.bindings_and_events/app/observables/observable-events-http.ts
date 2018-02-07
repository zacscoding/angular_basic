import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
// HTTP 요청을 보내기 위해 HttpModule과 Http 클래스를 불러옴
import {HttpModule, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app',
  template: `
    <h2>Observable weather</h2>
    <input type="text" placeholder="Enter city" [formControl]="searchInput">
    <h3>{{ temperature}}</h3>
  `
})
export class AppComponent {
  private baseWeatherURL: string = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix: string = '&units=metric&appid=ca3f6d6ca3973a518834983d0b318f73';

  searchInput: FormControl = new FormControl();
  temperature: string;

  constructor(private http: Http) {
    this.searchInput.valueChanges
    .debounceTime(200)
    // 입력 필드에 입력된 값으로 getWeather() 함수를 호출하고, 날씨 정보를 받기 위해 HTTP 요청을 보냄
    .switchMap(city => this.getWeather(city))
    // 옵저버블 스트림을 생성하기 위해 subscribe() 함수를 호출하는데(이 예제는 200ms마다 스트림 엘리먼트 생성)
    .subscribe(
        res => {
          this.temperature =
              `Current temperature is ${res['main'].temp}℃` +
              `humidity : ${res['main'].humidity}%`
        },
        // 에러 발생 시 처리
        err => {
          console.log(`Can't get weather. Error code : %s, URL :%s`, err.message, err.url)
        },
        // 스트림이 종료되었을 때 실행 할 함수
        () => {
          console.log(`Weather is retrieved`)
        }
    );
  }

  getWeather(city: string): Observable<Array<string>> {
    // URL을 구성하고 HTTP GET 요청을 보냄
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
    // 서버응답으로 받은 Response 객체를 JSON 객체로 변환
    // Response 객체는 데이터를 문자열로 담고 있기 때문에, JSON 객체로 변환해서 처리하는 것이 편함
    .map(res => {
      console.log(res.json());
      return res.json();
    })
    .catch(err => {
      if (err.status === 404) {
        console.log(`City ${city} not found`);
        return Observable.of();
      }
    });
  }
}

@NgModule({
  // HttpModule을 사용할 수 있도록 패키지를 로드
  imports: [BrowserModule, ReactiveFormsModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
