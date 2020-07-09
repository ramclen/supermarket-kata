import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProductsList from './ProductList';
import { DiscountHandler } from '../services/DiscountHandler';
import { forceTwoDigits } from '../services/DigitFormat';
import { PriceHandler } from '../services/PriceHandler';
import SubTotal from './Subtotal';
import Savings from './SavingSection';

export const App = ({ products }) => {
  const [discounts, setDiscounts] = useState({});
  const [prices, setPrices] = useState({});

  let discountHandler = new DiscountHandler(discounts);
  let priceHandler = new PriceHandler(prices);

  useEffect(() => {
    setDiscounts({
      Beans: (amount) => Math.floor(amount / 3) * 0.5,
      Coke: (amount) => Math.floor(amount / 2) * 0.4
    })

    setPrices({
      Beans: '0.50',
      Coke: '0.70',
      Orange: '1.99/kg'
    })
  }, [])

  const calculateTotal = () => {
    const total = priceHandler.calculateTotal(products, parseFloat(discountHandler.getTotalSavings(products)));

    return forceTwoDigits(total)
  }

  return (
    <div className="App">
      <ProductsList productsList={prices} />
      <div className="price-section">
        <SubTotal prices={prices} products={products} />

        <Savings discounts={discounts} />

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
