import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };

    case actionTypes.REMOVE_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };

    case actionTypes.INIT_ING:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 10,
        error: false,
      };

    case actionTypes.INIT_ING_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
