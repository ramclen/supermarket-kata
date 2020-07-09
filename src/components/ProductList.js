import React from 'react';
import { connect } from 'react-redux';
import { addProduct, setProduct } from '../actions';
import { Product } from './Product';

export const ProductList = ({ productsList, products, addProduct, setProduct }) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-8 offset-lg-2 col-12">
        <p className="text-info">Products</p>
        <div className="border border-info border-2 rounded pt-3 pb-1">
          {Object.keys(productsList).map(title => (
            <Product key={title} title={title} price={productsList[title]} amount={products[title]} onSet={setProduct} onAdd={addProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, { addProduct, setProduct })(ProductList);