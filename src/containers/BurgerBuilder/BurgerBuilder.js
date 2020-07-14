import React, { Component } from "react";

import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { act } from "react-dom/test-utils";


class BurgerBuilder extends Component {
  state = {
    orderable: false,
    checkout: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    // axios
    //   .get("https://react-burger-builder-cb28d.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(updatedIngredients) {
    const ingredients = updatedIngredients;
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);

    // this.setState({ orderable: sum > 0 });
    return sum > 0
  }

  checkoutHandler = () => {
    this.setState({ checkout: true });
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
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Application doesn't work!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={(type) =>this.props.addIngredient(type)}
            ingredientRemoved={(type) =>this.props.removeIngredient(type)}
            disabled={disabledInfo}
            price={this.props.price}
            orderable={this.updatePurchaseState(this.props.ings)}
            ordered={this.checkoutHandler}
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ing) =>
      dispatch({ type: actionTypes.ADD_ING, ingredient: ing }),
    removeIngredient: (ing) =>
      dispatch({ type: actionTypes.REMOVE_ING, ingredient: ing }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
