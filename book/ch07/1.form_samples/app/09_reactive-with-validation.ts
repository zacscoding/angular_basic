import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from "@angular/forms";

function ssnValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : {ssn: true};
}

function equalValidator({value}: FormGroup): { [key: string]: any } {
  // 폼 데이터의 모든 프로퍼티를 개별 변수로 할당
  const [first, ...rest] = Object.keys(value || {});
  // 프로퍼티를 순회하며 값이 같은지 검사
  const valid = rest.every(v => value[v] == value[first]);
  // null : 성공 , 에러 객체 : 실패 반환
  return valid ? null : {equal: true};
}

@Component({
  selector: 'app',
  template: `
    <!-- 
    form 엘리먼트에 formGroup 디렉티브를 사용해서 폼 그룹 지정
    반응형 폼 방식에서는 ngSubmit 이벤트 핸들러에 인자를 전달하지 않는다.
    -->
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()" novalidate>
      <!-- 입력 필드에 formControlName 디렉티브를 사용해 FormControl 인스턴스와 연결-->
      <div>
        <p>
          Username : <input type="text" formControlName="username">
          <span [hidden]="!formModel.hasError('required', 'username')">Username is required</span>
        </p>
      </div>
      <div>
        <p>
          SSN : <input type="text" formControlName="ssn">
          <span [hidden]="!formModel.hasError('ssn', 'ssn')">SSN is required</span>
        </p>
      </div>
      <!-- 
      HTML 구조는 컴포넌트에 선언한 구조와 동일하게 만듬. 이 <div> 엘리먼트는 formGroupName
      디렉티브를 사용해서 FormGroup 인스턴스와 연결
      -->
      <div formGroupName="passwordsGroup">
        <!-- password와 pconfirm 필드는 formControlName 디렉티브를 사용해서 연결-->
        <div>
          <p>
            Password : <input type="password" formControlName="password">
            <span [hidden]="!formModel.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
          </p>
        </div>
        <div>
          <p>
            Confirm password : <input type="password" formControlName="pconfirm">
            <span [hidden]="!formModel.hasError('equal', 'passwordsGroup')">Passwords must be the same</span>
          </p>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class AppComponent {
  // 폼 데이터는 컴포넌트 프로퍼티인 formModel에 저장
  formModel: FormGroup;

  constructor() {
    // FormGroup 생성자로 폼 모델을 정의
    this.formModel = new FormGroup({
      'username': new FormControl('', Validators.required),
      'ssn': new FormControl('', ssnValidator),
      // 비밀번호 필드와 비밀번호 확인 필드는 중첩 된 객체로 구성
      'passwordsGroup': new FormGroup({
        'password': new FormControl('', Validators.minLength(5)),
        'pconfirm': new FormControl()
      }, equalValidator)
    });
  }

  onSubmit() {
    if (this.formModel.valid) {
      // 컴포넌트의 formModel 프로퍼티를 사용해서 폼 데이터에 접근
      console.log(this.formModel.value);
      // console.log(this.formModel.value.username);
    }
  }
}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);