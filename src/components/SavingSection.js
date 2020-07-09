import React from "react";
import { connect } from "react-redux";
import { DiscountHandler } from "../services/DiscountHandler";
import { forceTwoDigits } from '../services/DigitFormat';

const SavingSection = ({ discounts, products }) => {
  const discountHandler = new DiscountHandler(discounts)

  const renderDiscounts = () => {
    const applicableDiscounts = discountHandler.getApplicableDiscounts(products)
    return Object.keys(applicableDiscounts).map(key => renderDiscount(key, applicableDiscounts[key]))
  }

  const renderDiscount = (name, value) => {
    return <span key={name} id={`${name.toLowerCase()}-discount`}>{forceTwoDigits(-value)}</span>
  }

  const getTotalSavings = () => {
    const totalSavings = discountHandler.getTotalSavings(products)
    return forceTwoDigits(-totalSavings)
  }

  return (<div className="savings-section">
    {renderDiscounts()}

    <span id="total-savings">{getTotalSavings()}</span>
  </div>)
}

const mapStateToProps = state => ({
  products: state.products
})


export default connect(mapStateToProps)(SavingSection);