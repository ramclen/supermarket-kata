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

  const discounts = {
    Beans: (amount) => forceTwoDigits(-Math.floor(amount / 3) * 0.5),
    Coke: (amount) => forceTwoDigits(-Math.floor(amount / 2) * 0.4)
  }

  const forceTwoDigits = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2)
  }

  const calculateSubTotal = () => {
    const subtotal = Object
      .keys(products)
      .map(name => products[name] * parseFloat(productPrices[name]))
      .reduce((acc, price) => acc + price, 0)
    return forceTwoDigits(subtotal);
  }

  const renderDiscounts = () => {
    return Object.keys(discounts)
      .map(name => ({ name, total: discounts[name](products[name]) }))
      .filter(discount => discount.total < 0)
      .map(discount => renderDiscount(discount))
  }

  const renderDiscount = ({ name, total }) => {
    return <span key={name} id={`${name.toLowerCase()}-discount`}>{total}</span>
  }

  const calculateTotalSavings = () => {
    const totalSavings = Object.keys(discounts)
      .map(name => discounts[name](products[name] ? products[name] : 0))
      .reduce((acc, discount) => acc + parseFloat(discount), 0)
    return forceTwoDigits(totalSavings)
  }

  const calculateTotal = () => {
    const totalSavings = parseFloat(calculateTotalSavings());
    const totalWithoutSavings = parseFloat(calculateSubTotal());

    return forceTwoDigits(totalSavings + totalWithoutSavings)
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

          <span id="total-savings">{calculateTotalSavings()}</span>
        </div>

        <div id="total">
          {calculateTotal()}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, {})(App);
