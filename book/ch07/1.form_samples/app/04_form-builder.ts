import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ReactiveFormsModule, FormControl, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app',
  template: `
    <!-- 
    form 엘리먼트에 formGroup 디렉티브를 사용해서 폼 그룹 지정
    반응형 폼 방식에서는 ngSubmit 이벤트 핸들러에 인자를 전달하지 않는다.
    -->
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()">
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
  formModel: FormGroup;

  // FormBuilder는 ReactiveFormsModule을 로드하면 생성자에 의존성으로 주입 가능
  constructor(fb: FormBuilder) {
    // FormBuilder.group() 함수는 객체를 인자로 받아 FormGroup을 생성하며, 폼 그룹을
    // 정의하기 위해 인자로 전달하는 객체는 FormGroup 클래스를 직접 사용할 때와 동일한 구조다
    this.formModel = fb.group({
      // FormControl을 정의하면서 초기값을 설정할 수 있음.
      'username': ['InitValue'],
      'ssn': [''],
      // FormGroup과 마찬가지로 FormBuilder도 중첩해 사용 가능
      'passwordsGroup': fb.group({
        'password': [''],
        'pconfirm': ['']
      })
    });
  }

  onSubmit() {
    console.log(this.formModel.value);
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