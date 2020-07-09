

export class DiscountHandler {
  constructor(discounts) {
    this.discounts = discounts;
  }

  /**
   * It returns the total discount that would produce the passed bill
   * @param  {} bill
   * @returns {number}
   */
  getTotalSavings(bill) {
    return Object.keys(this.discounts)
      .map(name => this.discounts[name](bill[name] ? bill[name] : 0))
      .reduce((acc, discount) => acc + parseFloat(discount), 0)
  }

  /**
   * It returns an object with all applicable discount for the passed bill.
   * Object is structure with keys as the name of product and the total discount is the value
   * @param  {Object} bill
   * @returns {Object} discounts
   */
  getApplicableDiscounts(bill) {
    return Object.keys(this.discounts)
      .map(name => ({ name, total: this.discounts[name](bill[name]) }))
      .filter(discount => discount.total > 0)
      .reduce((obj, discount) => ({ ...obj, [discount.name]: discount.total }), {})
  }
}
