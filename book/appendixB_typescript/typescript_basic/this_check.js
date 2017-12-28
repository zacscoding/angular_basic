function StockQuoteGeneratorArrow(symbol) {
    var _this = this;
    this.symbol = symbol;
    setInterval(function () {
        console.log('StockQuoteGeneratorArrow. The price quote for '
            + _this.symbol + ' is ' + Math.random());
    }, 1000);
}
var stockQuoteGeneratorArrow = new StockQuoteGeneratorArrow('IBM');
function StockQuoteGeneratorAnonymous(symbol) {
    this.symbol = symbol;
    setInterval(function () {
        console.log('StockQuoteGeneratorAnonymous. The price quote for '
            + this.symbol + ' is ' + Math.random());
    }, 1000);
}
var stockQuoteGeneratorAnonymous = new StockQuoteGeneratorAnonymous('IBM');
