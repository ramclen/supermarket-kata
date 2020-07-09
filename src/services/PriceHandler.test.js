const { PriceHandler } = require("./PriceHandler");

describe("Price Handler", () => {
  it("should calculate prices from bill", () => {
    const prices = {
      Beans: '0.50',
      Coke: '0.70',
      Orange: '1.99/kg'
    }

    const bill = {
      Beans: 2,
      Coke: 1
    }
    const priceHandler = new PriceHandler(prices);

    expect(priceHandler.calculateSubTotal(bill)).toBe(1.7);
  })
})