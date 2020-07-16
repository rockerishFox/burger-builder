import React, { Component } from "react";

import axios from "../../axios-orders";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    orderable: false,
    checkout: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState(updatedIngredients) {
    const ingredients = updatedIngredients;
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);

    // this.setState({ orderable: sum > 0 });
    return sum > 0;
  }

  checkoutHandler = () => {
    if (this.props.isAuth) {
      this.setState({ checkout: true });
    } else {
      this.props.history.push("./auth");
    }
  };

  checkoutCancelHandler = () => {
    this.setState({ checkout: false });
  };

  checkoutContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");

    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Application doesn't work!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={(type) => this.props.addIngredient(type)}
            ingredientRemoved={(type) => this.props.removeIngredient(type)}
            disabled={disabledInfo}
            price={this.props.price}
            orderable={this.updatePurchaseState(this.props.ings)}
            ordered={this.checkoutHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.props.ings}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.checkout}
          modalClosed={this.checkoutCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    addIngredient: (ing) => dispatch(burgerBuilderActions.addIngredient(ing)),
    removeIngredient: (ing) =>
      dispatch(burgerBuilderActions.removeIngredient(ing)),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
