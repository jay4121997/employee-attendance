import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/allActions";

import Auxx from "../auux/auxx";
import Navbar from "../../components/Navigation/Navbar/Navbar";

class layout extends Component {
  render() {
    let authFailed = null;
    if (this.props.authFail) {
      this.props.logout();
      alert("Authantication Failed");
      authFailed = <Redirect to="/auth" />;
    }

    return (
      <Auxx>
        {authFailed}
        <Navbar isAuthanticated={this.props.isAuthanticated} />
        {/* Sidebar */}
        <main> {this.props.children}</main>
      </Auxx>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthanticated: state.token !== null,
    authFail: state.auth_fail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(layout);
