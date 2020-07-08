import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions';

export const ProductList = ({ productsList, products, addProduct }) => {
  return (
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
  )
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, { addProduct })(ProductList);