import {Component, NgModule, Directive} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {FormsModule, FormControl, NG_VALIDATORS} from "@angular/forms";

/**
 * FormControl에 입력된 SSN이 유효하면 true를 반환하고, 유효하지 않으면 false를 반환한다.
 */
function ssnValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: true};
}

// @angular/core 모듈의 @Directive 어노테이션을 사용해서 디렉티브를 정의
@Directive({
  // 디렉티브의 셀렉터는 HTML 어트리뷰트로 지정
  selector: '[ssn]',
  providers: [{
    // ssnValidator() 함수를 NG_VALIDATORS 프로바이더 형식으로 등록
    provide: NG_VALIDATORS,
    useValue: ssnValidator,
    multi: true
  }]
})
class SsnValidatorDirective {
}

@Component({
  selector: 'app',
  template: `
    <form #f="ngForm">
      <p>
        SSN : <input type="text" name="my-ssn" ngModel ssn>
        <span [hidden]="!f.form.hasError('ssn', 'my-ssn')">SSN is invalid</span>
      </p>
    </form>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, SsnValidatorDirective],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);