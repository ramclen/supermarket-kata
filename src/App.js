import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProductsList from './components/ProductList';
import { render } from 'enzyme';

export const App = ({ products }) => {
  const productPrices = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };

  const forceTwoDigits = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2)
  }

  const calculateSubTotal = () => {
    const subtotal = Object
      .entries(productPrices)
      .map(([name, price]) => (products[name] || 0) * parseFloat(price))
      .reduce((acc, price) => {
        return acc + price
      }, 0)
    return forceTwoDigits(subtotal);
  }

  const renderDiscounts = () => {
    if (products["Coke"] > 1) {
      return (<span id="coke-discount">{forceTwoDigits(-Math.floor(products["Coke"] / 2) * 0.4)}</span>)
    } if (products["Beans"] > 2) {
      return (<span id="beans-discount">{forceTwoDigits(-Math.floor(products["Beans"] / 3) * 0.5)}</span>)
    }
  }


  return (
    <div className="App">
      <ProductsList productsList={productPrices} />
      <div className="price-section">
        <div className="subtotal-section">
          <h3>Sub - Total</h3>
          <span id="subtotal">{calculateSubTotal()}</span>
        </div>

        <div className="savings-section">
          {renderDiscounts()}
        </div>

        <div id="total">

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, {})(App);
