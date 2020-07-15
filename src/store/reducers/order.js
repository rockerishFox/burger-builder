import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {
        purchased: false,
      });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true,
      });

    case actionTypes.PURCHASE_BURGER_SUCCES:
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
        purchased: false,
      });

    case actionTypes.PURCHASE_BURGER_ERROR:
      return updateObject(state, {
        loading: false,
      });

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {
        loading: true,
      });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.orders,
      });

    case actionTypes.FETCH_ORDERS_ERROR:
      return updateObject(state, {
        loading: false,
      });

    default:
      return state;
  }
};

export default reducer;
