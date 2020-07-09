import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProductsList from './components/ProductList';
import { DiscountHandler } from './services/DiscountHandler';
import { forceTwoDigits } from './services/DigitFormat';

export const App = ({ products }) => {
  const [discounts, setDiscounts] = useState({})
  const productPrices = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };

  let discountHandler = new DiscountHandler(discounts);

  useEffect(() => {
    setDiscounts({
      Beans: (amount) => Math.floor(amount / 3) * 0.5,
      Coke: (amount) => Math.floor(amount / 2) * 0.4
    })
  }, [])



  const calculateSubTotal = () => {
    const subtotal = Object
      .keys(products)
      .map(name => products[name] * parseFloat(productPrices[name]))
      .reduce((acc, price) => acc + price, 0)
    return forceTwoDigits(subtotal);
  }

  const renderDiscounts = () => {
    const applicableDiscounts = discountHandler.getApplicableDiscounts(products)
    return Object.keys(applicableDiscounts)
      .map(key => renderDiscount(key, applicableDiscounts[key]))
  }

  const renderDiscount = (name, value) => {
    return <span key={name} id={`${name.toLowerCase()}-discount`}>{forceTwoDigits(-value)}</span>
  }

  const getTotalSavings = () => {
    const totalSavings = discountHandler.getTotalSavings(products)
    return forceTwoDigits(-totalSavings)
  }

  const calculateTotal = () => {
    const totalSavings = parseFloat(getTotalSavings());
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

          <span id="total-savings">{getTotalSavings()}</span>
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
