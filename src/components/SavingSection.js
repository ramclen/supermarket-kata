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
    return (
      <div key={name} className="row ">
        <div className="col-lg-3 col-4 offset-lg-6 offset-1">{name}</div>
        <div id={`${name.toLowerCase()}-discount`} className="col-2">{forceTwoDigits(-value)}</div>
      </div>
    )
  }

  const getTotalSavings = () => {
    const totalSavings = discountHandler.getTotalSavings(products)
    return forceTwoDigits(-totalSavings)
  }

  return (
    <div>
      <div className="row mt-3">
        <div className="col-lg-3 col-4 offset-lg-6 offset-1 font-weight-bold">Savings</div>
      </div>
      {renderDiscounts()}
      <hr />
      <div className="row mt-2">
        <div className="col-lg-3 col-4 offset-lg-6 offset-1 font-weight-bold">Total savings</div>
        <div id="total-savings" className="col-2 savings-section">{getTotalSavings()}</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products
})


export default connect(mapStateToProps)(SavingSection);