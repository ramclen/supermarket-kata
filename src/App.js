import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProductsList from './components/ProductList';

export const App = ({ products }) => {
  const productsList = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };

  products

  return (
    <div className="App">
      <ProductsList productsList={productsList} />
      <div className="price-section">
        <div className="subtotal-section">
          <h3>Sub - Total</h3>
          <span id="subtotal">1.70</span>
        </div>

        <div className="savings-section">

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
