import React from 'react';
import AppConnected, { App } from './App';
import configureStore from "redux-mock-store";
import { shallow, mount } from 'enzyme';
import { addProduct } from './actions';
import { Provider } from 'react-redux';

describe("App", () => {
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

  it("should have a section for price ", () => {
    expect(appWrapper.exists('.total-section')).toBe(true);
  })

  it("should have a sub-total section", () => {
    expect(appWrapper.exists('.subtotal-section')).toBe(true);
  })

})