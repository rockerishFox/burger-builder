import * as actionTypes from "./actionTypes";

import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerError = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_ERROR,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    // first we announce the purchasing process has started
    dispatch(purchaseBurgerStart());

    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerError(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};
