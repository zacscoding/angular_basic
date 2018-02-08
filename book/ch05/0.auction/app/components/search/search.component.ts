import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms"; // 폼 모듈 로드

@Component({
  selector: 'auction-search',
  templateUrl: 'app/components/search/search.component.html'
})
export default class SearchComponent {
  // 폼 그룹 formModel을 선언
  // 폼 컨트롤 title, price, category 선언. 이 폼 컨트롤은 모두 폼 그룹 formModel의 하위 항목
  formModel: FormGroup = new FormGroup({
    'title': new FormControl(),
    'price': new FormControl(),
    'category': new FormControl()
  });
}