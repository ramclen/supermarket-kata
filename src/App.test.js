import React from 'react';
import AppConnected, { App } from './App';
import configureStore from "redux-mock-store";
import { mount } from 'enzyme';
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
    expect(appWrapper.exists('.price-section')).toBe(true);
  })

  it("price section should have a sub-total, total and savings inside", () => {
    expect(appWrapper.exists('.price-section .subtotal-section')).toBe(true);
    expect(appWrapper.exists('.price-section .savings-section')).toBe(true);
    expect(appWrapper.exists('.price-section #total')).toBe(true);
  })


  it("Should no appear discounts section if it is not one applicable", () => {
    state = {
      products: {
        Beans: 2,
        Coke: 1
      }
    };
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.find(".subtotal-section #subtotal").getElement().props.children).toBe("1.70");
    expect(appWrapper.exists(".saving-section")).toBe(false)
  })

  it("Should detect discounts for coke (2 cokes for 1£)", () => {
    state = {
      products: {
        Coke: 2
      }
    }
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.exists("#coke-discount")).toBe(true)
    expect(appWrapper.exists("#beans-discount")).toBe(false)
    expect(appWrapper.find("#subtotal").getElement().props.children).toBe("1.40");
    expect(appWrapper.find("#coke-discount").getElement().props.children).toBe("-0.40");
  })

  it("Should detect discounts for beans (3 beans for 2£)", () => {
    state = {
      products: {
        Beans: 3
      }
    }
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.exists("#coke-discount")).toBe(false)
    expect(appWrapper.exists("#beans-discount")).toBe(true)
    expect(appWrapper.find("#subtotal").getElement().props.children).toBe("1.50");
    expect(appWrapper.find("#beans-discount").getElement().props.children).toBe("-0.50");
  })

  it("Should detect discounts for beans and coke", () => {
    state = {
      products: {
        Coke: 2,
        Beans: 3
      }
    }
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.exists("#coke-discount")).toBe(true)
    expect(appWrapper.exists("#beans-discount")).toBe(true)
    expect(appWrapper.find("#subtotal").getElement().props.children).toBe("2.90");
    expect(appWrapper.find("#coke-discount").getElement().props.children).toBe("-0.40");
    expect(appWrapper.find("#beans-discount").getElement().props.children).toBe("-0.50");
  })

  it('Should exists total savings ', () => {
    expect(appWrapper.exists("#total-savings")).toBe(true);
  })

  it('Should calculate total savings for 6 beans and 5 cokes', () => {
    state = {
      products: {
        Coke: 5,
        Beans: 6
      }
    }
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.exists("#total-savings")).toBe(true)
    expect(appWrapper.find("#total-savings").getElement().props.children).toBe("-1.80");
  })

  it('Should show the total to pay using the discounts', () => {
    state = {
      products: {
        Coke: 5,
        Beans: 6
      }
    }
    store.dispatch({ type: "none" });
    appWrapper.update();

    expect(appWrapper.exists("#total")).toBe(true)
    expect(appWrapper.find("#total").getElement().props.children).toBe("4.70");
  })

})