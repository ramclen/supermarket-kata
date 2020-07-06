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

  it("should have the price per product", () => { })

  it("should show how many has been selected", () => { })
})

