export class PriceHandler {
  constructor(prices) {
    this.prices = prices;
  }

  /**
   * it calculates subTotal from a bill using prices on the constructor
   * @param  {} bill
   */
  calculateSubTotal(bill) {
    return Object
      .keys(bill)
      .map(name => bill[name] * parseFloat(this.prices[name]))
      .reduce((acc, price) => acc + price, 0);
  }

  /**
   * It calculates the total, if discount passed will subtract from the total
   * @param  {} bill
   * @param  {number} discount = 0
   */
  calculateTotal(bill, discount = 0) {
    return this.calculateSubTotal(bill) - discount;
  }

}
