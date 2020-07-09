export class PriceHandler {
  constructor(prices) {
    this.prices = prices;
  }

  calculateSubTotal(bill) {
    return Object
      .keys(bill)
      .map(name => bill[name] * parseFloat(this.prices[name]))
      .reduce((acc, price) => acc + price, 0)
  }
}
