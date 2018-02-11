import {Component, Output, Directive, EventEmitter} from "@angular/core";
import {Stock} from './stock';

@Component({
  selector: 'price-quoter',
  template: `
    <strong><input type="button" value="Buy" (click)="buyStocks($event)">
      {{ stockSymbol }} {{ lastPrice | currency: 'USD' : true : '1.2-2' }} </strong>
  `,
  styles: [`:host {
    background: pink;
    padding: 5px 15px 15px 15px;
  }`]
})
export class PriceQuoterComponent {
  @Output() buy: EventEmitter<Stock> = new EventEmitter<Stock>();

  stockSymbol: string = 'IBM';
  lastPrice: number;

  constructor() {
    setInterval(() => {
      this.lastPrice = 100 * Math.random();
    }, 2000);
  }

  buyStocks(): void {
    let stockToBuy: Stock = {
      stockSymbol: this.stockSymbol,
      bidPrice: this.lastPrice
    };

    this.buy.emit(stockToBuy);
  }
}