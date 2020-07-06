import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addProduct } from './actions';

export const App = ({ products, addProduct }) => {
  const productsList = {
    Beans: '0.50',
    Coke: '0.70',
    Orange: '1.99/kg'
  };

  return (
    <div className="App">
      <ul>
        {Object.keys(productsList).map(title => (
          <li className="product-item" key={title}>
            <span className="product-title">{title}</span>
            <span className="product-price">{productsList[title]}</span>
            <button className="add-btn" onClick={() => addProduct(title)}>add</button>
            <span className="product-counter"> {products[title] ? products[title] : 0} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, { addProduct })(App);
