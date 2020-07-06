const { combineReducers } = require("redux");
const { ADD_PRODUCT } = require("../actions/types");

export default combineReducers({
  products: (state = {}, { type, payload }) => {
    if (type === ADD_PRODUCT) {
      return { ...state, [payload.product]: (state[payload.product] ? state[payload.product] + 1 : 1) }
    }
    return state;
  }
})