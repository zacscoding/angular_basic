function StockQuoteGeneratorArrow(symbol : string) {
  this.symbol = symbol;
  setInterval(() => {
    console.log('StockQuoteGeneratorArrow. The price quote for '
    + this.symbol + ' is ' + Math.random());
  }, 1000);
}

let stockQuoteGeneratorArrow = new StockQuoteGeneratorArrow('IBM');

function StockQuoteGeneratorAnonymous(symbol : string) {
  this.symbol = symbol;
  setInterval(function() {
    console.log('StockQuoteGeneratorAnonymous. The price quote for '
    + this.symbol + ' is ' + Math.random());
  }, 1000);  
}

let stockQuoteGeneratorAnonymous = new StockQuoteGeneratorAnonymous('IBM');