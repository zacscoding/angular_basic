import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app',
  template: `
    <!-- 
    form 엘리먼트에 formGroup 디렉티브를 사용해서 폼 그룹 지정
    반응형 폼 방식에서는 ngSubmit 이벤트 핸들러에 인자를 전달하지 않는다.
    -->
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()" novalidate>
      <!-- 입력 필드에 formControlName 디렉티브를 사용해 FormControl 인스턴스와 연결-->
      <div>Username : <input type="text" formControlName="username"></div>
      <div>SSN : <input type="text" formControlName="ssn"></div>
      <!-- 
      HTML 구조는 컴포넌트에 선언한 구조와 동일하게 만듬. 이 <div> 엘리먼트는 formGroupName
      디렉티브를 사용해서 FormGroup 인스턴스와 연결
      -->
      <div formGroupName="passwordsGroup">
        <!-- password와 pconfirm 필드는 formControlName 디렉티브를 사용해서 연결-->
        <div>Password : <input type="password" formControlName="password"></div>
        <div>Confirm password : <input type="password" formControlName="pconfirm"></div>
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
      'username': new FormControl(),
      'ssn': new FormControl(),
      // 비밀번호 필드와 비밀번호 확인 필드는 중첩 된 객체로 구성
      'passwordsGroup': new FormGroup({
        'password': new FormControl(),
        'pconfirm': new FormControl()
      })
    });
  }

  onSubmit() {
    // 컴포넌트의 formModel 프로퍼티를 사용해서 폼 데이터에 접근
    console.log(this.formModel.value);
    // console.log(this.formModel.value.username);
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