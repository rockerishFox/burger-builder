import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
  building: true,
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 4,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
    building: true,
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
    building: true,
  };

  return updateObject(state, updatedSt);
};

const initIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 10,
    error: false,
    building: false
  });
};

const initIngredientsError = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return addIngredient(state, action);

    case actionTypes.REMOVE_ING:
      return removeIngredient(state, action);

    case actionTypes.INIT_ING:
      return initIngredients(state, action);

    case actionTypes.INIT_ING_ERROR:
      return initIngredientsError(state, action);

    default:
      return state;
  }
};

export default reducer;
