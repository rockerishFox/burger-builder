import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

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
      const updatedIngredient = {
        [action.ingredient]: state.ingredients[action.ingredient] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };

      return updateObject(state, updatedState);

    case actionTypes.REMOVE_ING:
      const updatedIng = {
        [action.ingredient]: state.ingredients[action.ingredient] - 1,
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };

      return updateObject(state, updatedSt);

    case actionTypes.INIT_ING:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 10,
        error: false,
      });

    case actionTypes.INIT_ING_ERROR:
      return updateObject(state, {
        error: true,
      });

    default:
      return state;
  }
};

export default reducer;
