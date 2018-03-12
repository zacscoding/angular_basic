import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";

function ssnValidator(control: FormControl): { [key: string]: any } {
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : { ssn : { description : 'SSN is invald' } };
}

@Component({
  selector: 'app',
  template: `
    <form [formGroup]="form">
      <p>
        SSN :
        <input type="text" formControlName="my-ssn">
        <span [hidden]="!form.hasError('ssn', 'my-ssn')">
              {{ form.getError('ssn', 'my-ssn')?.description}}            
          </span>
      </p>
    </form>
  `
})
class AppComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'my-ssn': new FormControl('', ssnValidator)
    });
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