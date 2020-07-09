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
    <div className="subtotal-section">
      <h3>Sub - Total</h3>
      <span id="subtotal">{calculateSubTotal()}</span>
    </div>
  )
}

const mapToProps = state => ({
  products: state.products
})

export default connect(mapToProps)(SubTotal)