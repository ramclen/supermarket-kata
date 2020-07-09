const { combineReducers } = require("redux");
const { ADD_PRODUCT, SET_PRODUCT } = require("../actions/types");

export default combineReducers({
  products: (state = {}, { type, payload }) => {
    if (type === ADD_PRODUCT) {
      return { ...state, [payload.product]: (state[payload.product] ? state[payload.product] + payload.amount : payload.amount) }
    }
    if (type === SET_PRODUCT) {
      return { ...state, [payload.product]: payload.amount }
    }
    return state;
  }
})