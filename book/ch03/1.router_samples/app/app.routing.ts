// Routes와 RouterModule을 불러옴
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProductDetailComponent } from './components/product.component';

const routes : Routes = [
    // 기본 URL이면 HomeComponent를 렌더링
    { path : '', component : HomeComponent },
    // 기본 URL 뒤에 product 주소가 붙으면, ProductDetailComponent를 렌더링
    { path : 'product', component : ProductDetailComponent }
];
// 라우터 설정을 모듈 외부로 공개해서 루트 모듈에서 사용할 수 있도록 함.
export const routing = RouterModule.forRoot(routes);

