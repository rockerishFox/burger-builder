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

export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerStart(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerError(error));
      });
  };
};
