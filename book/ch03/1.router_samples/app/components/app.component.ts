import {Component} from '@angular/core';
@Component({
    selector: 'app',
    template: `
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['/product']">Product Details</a>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}

// 기본 주소로 이동하는 링크를 만듬
// /product 주소로 이동하는 링크를 만듬
// 컴포넌트를 렌더링할 위치는 <router-outlet> 태그로 지정
// [routerLink] :: 프로퍼티 바인딩 && ['/product'] :: routerLink 프로퍼티에 /product 주소와 연결되는 컴포넌트를 바인딩
// => <router-outlet> 태그가 사용된 곳에 렌더링