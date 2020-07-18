import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
// componentWillUpdate(){
//   console.log("[ordersummary]");
// }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
          {this.props.ingredients[key]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your order:</h3>
        <p>Burger with following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <b>Total Price: {this.props.price.toFixed(2)}</b>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.checkoutCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.checkoutContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
