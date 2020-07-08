import React from 'react';
import AppConnected, { App } from './App';
import configureStore from "redux-mock-store";
import { shallow, mount } from 'enzyme';
import { addProduct } from './actions';
import { Provider } from 'react-redux';

describe("Products", () => {
  let appWrapper;
  let store;
  let state;
  beforeEach(() => {
    state = { products: {} }
    store = configureStore()(() => state);
    store.dispatch = jest.fn(store.dispatch);
    appWrapper = mount(<Provider store={store}><AppConnected /></Provider>);
  })

  it("should have a list of products", () => {
    expect(appWrapper.exists('.product-item')).toBe(true)
  })

  it("should show the products that supermarket has", () => {
    const products = appWrapper.find('.product-title').map(item => item.text());
    expect(appWrapper.find('.product-item')).toHaveLength(3);
    expect(['Coke', 'Orange', 'Beans'].sort()).toEqual(products.sort());
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
    const firstItem = appWrapper.find(".product-item").first();
    const productTitle = firstItem.find('.product-title').text();
    state = { products: { [productTitle]: 1 } }
    const addProductAction = addProduct(productTitle);

    firstItem.find('.add-btn').simulate('click');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(addProductAction);

    expect(parseInt(firstItem.find('.product-counter').text())).toBe(1);
  })
})