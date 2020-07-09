const { PriceHandler } = require("./PriceHandler");

describe("Price Handler", () => {
  let prices;
  let priceHandler;

  beforeEach(() => {
    prices = {
      Beans: '0.50',
      Coke: '0.70',
      Orange: '1.99/kg'
    }
    priceHandler = new PriceHandler(prices);
  })

  it("should calculate prices from bill", () => {
    const bill = {
      Beans: 2,
      Coke: 1
    }

    expect(priceHandler.calculateSubTotal(bill)).toBe(1.7);
  })

  it("should calculate total if total discount is passed", () => {
    const bill = {
      Beans: 3,
      Coke: 2
    }

    expect(priceHandler.calculateTotal(bill, 0.9)).toBe(2);
  })
})