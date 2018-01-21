import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

@Component({
    selector : 'home',
    template : `
        <div class="home">Home Component
            <input type="text" placeholder="Type something here"></div>`,
    styles : [ `.home { background: red; padding: 15px 0 0 30px; height: 80px; width: 70%;
        font-size: 30px; float : left; box-sizing: border-box; }`]
})
export class HomeComponent {}

@Component({
    selector : 'chat',
    template : `<textarea placeholder="Chat with customer service" class="chat"></textarea> `,
    styles : [`.chat { background : #eee; height : 80px; width : 30%; font-size : 24px; float : left; display : block; box-sizing : border-box; }`]
})
export class ChatComponent {}

const routes : Routes = [
    { path : '', redirectTo : 'home', pathMatch : 'full' },
    // home 주소에 대한 라우터 설정 => 라우팅 영역의 이름을 지정하지 않아 기본 라우팅 영역에 적용
    { path : 'home', component : HomeComponent },
    // chat 주소에 대한 라우터를 설정 => aux 라는 이름의 라우팅 영역에 적용
    { path : 'chat', component : ChatComponent outlet : 'aux'}
];

@Component({
    selector : 'app',
    template : `
        <a [routerLink]="['']">Home</a>
        <a [routerLink]="[{ outlets : { primary : 'home', aux : 'chat' }}]">Open Chat</a>
        <a [routerLink]="[{ outlets : { aux : null }}]">Close Chat</a>
        <br/>
        <router-outlet></router-outlet>
        <router-outlet name="aux"></router-outlet>
    `
})
class AppComponent {}
// Open Chat :: home 주소에 해당하는 컴포넌트를 기본 라우팅 영역에 렌더링, chat 주소에 해당하는 컴포넌트는 aux라는 이름의 라우팅 영역에 렌더링
// Close Chat :: 추가 라우팅 영역을 비우기 위해 라우팅 영역에 null 값을 지정
// <router-outlet> :: 기본 라우팅 영역을 선언
// <router-outlet name="aux"> :: 이름을 aux로 지정해 <router-outlet>을 선언

@NgModule({
    imports : [BrowserModule, RouterModule.forRoot(routes)],
    declarations : [AppComponent, HomeComponent, ChatComponent],
    providers : [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
    bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
