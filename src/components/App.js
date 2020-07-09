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
    <div className="container-fluid App">
      <div className="row">
        <div className="col-12">
          <img
            id="trolley"
            className="img-fluid mx-auto d-block"
            src="https://cdn.pixabay.com/photo/2020/02/26/07/41/grocery-basket-4880912_960_720.png" alt="Trolley" />
        </div>
      </div>

      <ProductsList productsList={prices} />

      <div className="price-section row">
        <div className="col-lg-8 offset-lg-2 col-12">
          <p className="text-info">Total</p>
          <div className="border border-info border-2 rounded pt-3 pb-2">
            <SubTotal prices={prices} products={products} />

            <Savings discounts={discounts} />
            <hr />
            <div className="row mt-2">
              <div className="col-lg-3 col-4 offset-lg-6 offset-1 font-weight-bold">Total to pay</div>
              <div id="total" className="col-2 font-weight-bold">{calculateTotal()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, {})(App);
