import { Component, Input, OnInit } from "@angular/core"; // ngOnInit() 함수가 정의 된 OnInit 인터페이스를 불러옴

@Component({
    templateUrl : 'app/components/stars/stars.component.html',
    style : [' .starrating {color : #d17581;}'],
    selector : 'auction-stars'
})
export default class StarsComponent implements OnInit {
    // 데이터 바인딩 표현식을 사용해 부모 컴포넌트에서 count와 rating 변수를 설정할 수 있도록 함
    @Input() count : number = 5;
    @Input() rating : number = 0;
    // 이 배열은 각 항목마다 별 하나를 렌더링
    stars : boolean[] = [];

    // 부모 컴포넌트에서 전달되는 값으로 stars 변수를 초기화
    ngOnInit() {
        for (let i=1; i<=this.count; i++) {
            this.stars.push(i > this.rating );
        }
    }

}