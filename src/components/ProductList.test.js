import React from 'react';
import configureStore from "redux-mock-store";
import { mount } from 'enzyme';
import { addProduct } from '../actions';
import { Provider } from 'react-redux';
import ProductList from './ProductList';

describe("Products", () => {
  let productListWrapper;
  let store;
  let state;
  const productsList = {
    beans: '0.50',
    coke: '0.70',
    orange: '1.99/kg'
  };
  beforeEach(() => {
    state = { products: {} }
    store = configureStore()(() => state);
    store.dispatch = jest.fn(store.dispatch);
    productListWrapper = mount(<Provider store={store}><ProductList productsList={productsList} /></Provider>);
  })

  it("should have a button with 'add' text", () => {
    expect(productListWrapper.exists('.add-btn')).toBe(true)
    productListWrapper.find('.add-btn').forEach(item => expect(item.text()).toBe('add'));
  })

  it("should have the correct price per product", () => {
    expect(productListWrapper.find(".product-price")).toHaveLength(Object.keys(productsList).length);
    productListWrapper.find(".product-item").forEach(item => {
      const productTitle = item.find('.product-title').text().toLowerCase();
      const expectedPrice = productsList[productTitle];
      expect(item.find('.product-price').text()).toBe(expectedPrice)
    })
  })

  it("should show how many has been selected", () => {
    const firstItem = productListWrapper.find(".product-item").first();
    const productTitle = firstItem.find('.product-title').text();
    state = { products: { [productTitle]: 1 } }
    const addProductAction = addProduct(productTitle);

    firstItem.find('.add-btn').simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(addProductAction);
    expect(firstItem.find('.product-counter').getDOMNode().value).toBe("1");
  })
})