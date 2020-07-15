import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

import { connect } from "react-redux";

class Checkout extends Component {
  // componentWillMount() {
  //   // // it's not nested so it will always mount
  //   // const query = new URLSearchParams(this.props.location.search);
  //   // const ingredients = {};
  //   // let price = 0;
  //   // for (let param of query.entries()) {
  //   //   if (param[0] === "price") {
  //   //     price = param[1];
  //   //   } else {
  //   //     ingredients[param[0]] = +param[1]; // + converts into number
  //   //   }
  //   // }
  //   // this.setState({ ingredients: ingredients, price: price });
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProp = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProp)(Checkout);
