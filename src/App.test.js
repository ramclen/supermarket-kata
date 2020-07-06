import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

describe("App", () => {
  let appWrapper;
  beforeEach(() => {
    appWrapper = shallow(<App />);
  })

  it("should have a list of products", () => {
    expect(appWrapper.exists('.product-item')).toBe(true)
  })

  it("should show the products that supermarket has", () => {
    const products = appWrapper.find('.product-title').map(item => item.text());
    expect(appWrapper.find('.product-item')).toHaveLength(3);
    expect(['Coke', 'Orange', 'Beans'].sort()).toEqual(products.sort());
  })

})

describe("Products", () => {
  let appWrapper;
  beforeEach(() => {
    appWrapper = shallow(<App />);
  })

  it("should have a button with 'add' text", () => {
    expect(appWrapper.exists('.add-btn')).toBe(true)
    appWrapper.find('.add-btn').forEach(item => expect(item.text()).toBe('add'));

  })

  it("should have the correct price per product", () => {
    const prices = {
      beans: '0.50',
      coke: '0.70',
      orange: '1.99/kg'
    };

    expect(appWrapper.find(".product-price")).toHaveLength(3);
    appWrapper.find(".product-item").forEach(item => {
      const productTitle = item.find('.product-title').text().toLowerCase();
      const expectedPrice = prices[productTitle];
      expect(item.find('.product-price').text()).toBe(expectedPrice)
    })
  })

  it("should show how many has been selected", () => {
    const firstItemAddBtn = appWrapper.find(".product-item").first().find('.add-btn');
    firstItemAddBtn.simulate('click').simulate('click');
    expect(appWrapper.find(".product-item").first().find('.product-counter')).toBe(2);
  })
})

