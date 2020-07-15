import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// named just as identifiers
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_ING,
    ingredient: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_ING,
    ingredient: name,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_ING,
    ingredients: ingredients,
  };
};

const setIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_ING_ERROR,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-builder-cb28d.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
          dispatch(setIngredientsFailed())
      });
  };
};
