const { DiscountHandler } = require("./DiscountCalculator")

describe("Discount Handler", () => {
  const discounts = {
    Beans: (amount) => Math.floor(amount / 3) * 0.5,
    Coke: (amount) => Math.floor(amount / 2) * 0.4
  }
  let discountHandler;

  beforeEach(() => {
    discountHandler = new DiscountHandler(discounts);
  })

  it("should be possible to return total savings", () => {
    const bill = {
      Coke: 5,
      Beans: 6
    }
    expect(discountHandler.getTotalSavings(bill)).toBe(1.8);
  })

  it("should be possible to get applicable discounts", () => {
    const bill = {
      Coke: 2,
      Beans: 3
    }
    expect(discountHandler.getApplicableDiscounts(bill).Coke.total).toBe(0.4);
    expect(discountHandler.getApplicableDiscounts(bill).Beans.total).toBe(0.5);
  })
})