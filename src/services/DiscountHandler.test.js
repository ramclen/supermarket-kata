const { DiscountHandler } = require("./DiscountHandler")

describe("Discount Handler", () => {
  const discounts = {
    Beans: (amount) => Math.floor(amount / 3) * 0.5,
    Coke: (amount) => Math.floor(amount / 2) * 0.4
  }

  it("should be possible to return total savings", () => {
    const bill = {
      Coke: 5,
      Beans: 6
    }
    const discountHandler = new DiscountHandler(discounts);
    expect(discountHandler.getTotalSavings(bill)).toBe(1.8);
  })


})