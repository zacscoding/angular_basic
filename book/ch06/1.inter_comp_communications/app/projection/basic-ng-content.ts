import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule, Component, ViewEncapsulation} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'child',
  styles: ['.wrapper {background: lightgreen;}'],
  // 부모 컴포넌트에서 전달하는 템플릿은 <ng-content>에 표시
  template: `
    <div class="wrapper">
      <h2>Child</h2>
      <div>This div is defined in the child's template</div>
      <ng-content></ng-content>
    </div>
  `,
  //encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.Emulated
  encapsulation: ViewEncapsulation.None
})
class ChildComponent {
}

@Component({
  selector: 'app',
  styles: ['.wrapper {background: cyan;}'],
  // <child> 태그 안 내용은 AppComponent에서 렌더링하지 않고, ChildComponent로 전달
  template: `
    <div class="wrapper">
      <h2>Parent</h2>
      <div>This div is defined in the Parent's template</div>
      <child>
        <div>Parent projects this div onto the childe</div>
      </child>
    </div>
  `,
  // encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.Emulated
  encapsulation: ViewEncapsulation.None
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, ChildComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
