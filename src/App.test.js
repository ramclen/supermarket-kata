import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe("App", () => {
  it("should have hello world text", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.find('.App').text()).toBe('Hello world')
  })
})

