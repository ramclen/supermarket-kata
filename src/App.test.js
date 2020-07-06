import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

describe("App", () => {
  it("should have a list of products", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.exists('.product-item')).toBe(true)
  })

  it("should show the products that supermarket has", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.find('.product-item')).toHaveLength(4);
  })
})

