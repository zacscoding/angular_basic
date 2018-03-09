import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ReactiveFormsModule, FormControl, FormGroup, FormArray} from "@angular/forms";

@Component({
  selector: 'app',
  template: `      
    <form [formGroup]="formModel" (ngSubmit)="onSubmit()">
      <label>Emails</label>      
      <button type="button" (click)="addEmail()">Add Email</button>
      <!-- formArrayName을 사용해서 컴포넌트의 FormArray를 DOM 엘리먼트와 연결 -->
      <ul formArrayName="emails">
        <!-- ngForm로 루프를 돌며 폼 모델에 있는 개수만큼 이메일 필드를 만듬 -->
        <li *ngFor="let e of formModel.get('emails').controls; let i=index;">
          <!-- <input> 엘리먼트는 인덱스에 맞게 FormControl과 연결 -->
          <input [formControlName]="i">
        </li>
      </ul>      
      <!-- // 클릭 이벤트 핸들러를 지정 -->
      <button type="submit">Submit</button>
    </form>
    <hr>
    <label>Form Value : </label>
    <pre>{{ value }}</pre>
  `
})
class AppComponent {
  // 폼 전체를 가리키는 FormGroup 인스턴스를 생성
  formModel: FormGroup = new FormGroup({
    // 사용자가 입력하는 이메일이 여러 개이기 때문에 FormArray 클래스 사용
    emails: new FormArray([
      new FormControl()
    ])
  });

  get value() {
    return JSON.stringify(this.formModel.value, null, 4);
  }

  addEmail() {
    const emails = this.formModel.get('emails') as FormArray;
    emails.push(new FormControl());
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


