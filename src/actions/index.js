import { ADD_PRODUCT, SET_PRODUCT } from "./types"

export const addProduct = (product, amount = 1) => {
  return {
    type: ADD_PRODUCT,
    payload: { product, amount }
  }
}

export const setProduct = (product, amount = 1) => {
  return {
    type: SET_PRODUCT,
    payload: { product, amount }
  }
}