import React from "react";
import { withRouter } from 'react-router-dom'; // adds match, history, location to component 
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // we transform the object with (key:value) pairs into an array of BurgerIngredients
  // where the value = how many ingredients and key = type of ingredient
  let ingredientsArray = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, index) => {
        return <BurgerIngredient key={key + index} type={key} />;
      });
    })
    .reduce((prev, current) => {
      return prev.concat(current);
    }, []);

  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
