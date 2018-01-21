import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LuxuryComponent } from "./luxury.component";

@NgModule({
    imports : [
        // BrowserModule 대신 CommonModule 사용
        CommonModule,
        // 이 모듈의 라우터는 forChilde() 함수를 사용해 설정
        RouterModule.forChild([
            // luxury 주소에 접근하면 LuxuryComponent를 사용
            { path : 'luxury', component : LuxuryComponent}
        ])
    ],
    // 이 모듈에는 컴포넌트가 하나만 존재
    declarations : [ LuxuryComponent ]
})
export class LuxuryModule {}
