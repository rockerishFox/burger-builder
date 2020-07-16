import React, { Component } from "react";
import classes from "./Layout.module.css";
import Aux from "../../hoc/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSidedrawer: false });
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleHandler} isAuth={this.props.isAuthenticated}/>
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSidedrawer}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
