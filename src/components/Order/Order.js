import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredientsArray = [];
  for (let ingredient in props.ingredients) {
    ingredientsArray.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }
  const ingredientsShown = ingredientsArray.map((ig) =>
    ig.amount > 0 ? (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "2px 5px",
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    ) : null
  );
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsShown} </p>
      <p>
        Price: <b>{Number.parseFloat(props.price).toFixed(2)}</b>
      </p>
    </div>
  );
};
export default order;
