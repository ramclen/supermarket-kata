

export class DiscountHandler {
  constructor(discounts) {
    this.discounts = discounts;
  }

  getTotalSavings(bill) {
    return Object.keys(this.discounts)
      .map(name => this.discounts[name](bill[name] ? bill[name] : 0))
      .reduce((acc, discount) => acc + parseFloat(discount), 0)
  }
}

// const discounts = {
//   Beans: (amount) => forceTwoDigits(-Math.floor(amount / 3) * 0.5),
//   Coke: (amount) => forceTwoDigits(-Math.floor(amount / 2) * 0.4)
// }

