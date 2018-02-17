import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'auction-stars',
  styles: [' .starrating { color: #d17581; }'],
  templateUrl: 'app/components/stars/stars.component.html'
})
export default class StarsComponent {
  private _rating: number;
  private stars: boolean[];

  private maxStarts: number = 5;

  @Input()
  readonly: boolean = true;

  @Input()
  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value || 0;
    this.stars = Array(this.maxStarts).fill(true, 0, this.rating);
  }

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter<number>();

  fillStarsWithColor(index) {
    console.log('fillStarsWithColor is called');

    if (!this.readonly) {
      if (this.rating > index) {
        this.rating = index;
      } else {
        this.rating = index + 1;
      }
      console.log(this.rating);
      this.ratingChange.emit(this.rating);
    }
  }
}