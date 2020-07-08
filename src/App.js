import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProductsList from './components/ProductList';

export const App = ({ products, addProduct }) => {
  const productsList = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };

  return (
    <div className="App">
      <ProductsList productsList={productsList} />
      <div className="price-section">
        <div className="subtotal-section">

        </div>

        <div id="total">

        </div>
      </div>
    </div>
  );
}



export default connect(undefined, {})(App);
