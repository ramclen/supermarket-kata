import React from 'react';

export const Product = ({ title, price, amount = 0, onAdd, onSet }) => {

  const onChange = (evt) => {
    if (evt.target.value) {
      onSet(title, parseFloat(evt.target.value))
    }
  }

  return (
    <div className="product-item row mb-3">
      <div className="col-md-2 col-1 offset-1 offset-md-0 d-flex justify-content-center">
        <button onClick={() => onAdd(title)} type="button" className="add-btn btn btn-info">add</button>
      </div>
      <div className="col-2 d-flex justify-content-center">
        <input
          type="number"
          value={amount}
          onChange={onChange}
          className="product-counter w-75 text-center border border-info" />
      </div>
      <div className="product-title col-lg-6 col-3">{title}</div>
      <div className="product-price col-1 text-center">{price}</div>
    </div>
  )

}