import React from "react";
import { PriceHandler } from "../services/PriceHandler";
import { forceTwoDigits } from '../services/DigitFormat';
import { connect } from "react-redux";

const SubTotal = ({ prices, products }) => {

  let priceHandler = new PriceHandler(prices);

  const calculateSubTotal = () => {
    const subtotal = priceHandler.calculateSubTotal(products);
    return forceTwoDigits(subtotal);
  }

  return (
    <div className="subtotal-section row mt-1">
      <div className="col-lg-3 col-4 offset-lg-6 offset-1 font-weight-bold">Sub-total</div>
      <div id="subtotal" className="col-2">{calculateSubTotal()}</div>
    </div>
  )
}

const mapToProps = state => ({
  products: state.products
})

export default connect(mapToProps)(SubTotal)