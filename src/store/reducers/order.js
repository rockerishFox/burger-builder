import * as actionTypes from "../actions/actionTypes";
import { act } from "react-dom/test-utils";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCES:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_ERROR:
      return { ...state, loading: false };

    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.orders };

    case actionTypes.FETCH_ORDERS_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default reducer;
