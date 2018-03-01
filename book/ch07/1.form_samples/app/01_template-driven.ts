import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <div>Username : <input type="text" name="username" ngModel></div>
      <div>SSN : <input type="text" name="ssn" ngModel></div>
      <div ngModelGroup="passwordsGroup">
        <div>Password : <input type="password" name="password" ngModel></div>
        <div>Confirm Password : <input type="password" name="pconfirm" ngModel></div>
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class AppComponent {
  onSubmit(formValue: any) {
    console.log('username',formValue.username);
    console.log('ssn',formValue.ssn);
    console.log('password', formValue.passwordsGroup.password);
    console.log('confirm', formValue.passwordsGroup.pconfirm);
    console.log(formValue);
  }
}

@NgModule({
  imports : [BrowserModule, FormsModule],
  declarations : [AppComponent],
  bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
