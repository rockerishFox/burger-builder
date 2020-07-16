import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, {
    purchased: false,
  });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat({
      ...action.orderData,
      id: action.orderId,
    }),
    purchased: true,
  });
};

const purchaseBurgerError = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders,
  });
};
const fetchOrderError = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // order burger
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCES:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_ERROR:
      return purchaseBurgerError(state, action);
    // showing all orders
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDERS_ERROR:
      return fetchOrderError(state, action);

    default:
      return state;
  }
};

export default reducer;
