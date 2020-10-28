import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import * as actions from "../../store/actions/allActions";

import Input from "../../components/UI/input/input";
// import Spinner from '../../components/UI/Spinner/Spinner'

import clsses from "./auth.module.css";

class Auth extends Component {
  state = {
    userData: {
      email: undefined,
      password:undefined
    },
    toSignup: false,
    retype:undefined
  };
 
  onChangeHandler(event, name) {
    let updatedState = { ...this.state };
    updatedState.userData = { ...this.state.userData };
    updatedState.userData[name]=event.target.value
   
    this.setState({ userData: updatedState.userData });

  }
  onFormSubmitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.userData.email,this.state.userData.password,!this.state.toSignup)
  };
  onSwitchSignupHandler = () => {
    this.setState({ toSignup: !this.state.toSignup });
  };
 
  render() {
    let redirect = null
    if (this.props.isAuthanticated) {
      redirect=<Redirect to='/' />
    }
    let form = (
      <div style={{ marginTop: "10%" }} className={clsses.form}>
        <div>
          <h1>{this.state.toSignup ? "SignUp Here" : "Login"}</h1>
          <form onSubmit={this.onFormSubmitHandler}>
            <Input
              type="email"
              value={this.state.email}
              onChange={(event) => this.onChangeHandler(event,'email')}
              placeholder="Username"
              required
            />
            <Input
              type="password"
              value={this.state.password}
              onChange={(event) => this.onChangeHandler(event,'password')}
              placeholder="Password"
              required
            />

            <button >{this.state.toSignup ? "Signup" : "Login"}</button>
          </form>
          <br></br>
          <button onClick={this.onSwitchSignupHandler}>
            {!this.state.toSignup ? "New Member??" : "Switch to Login"}
          </button>
        </div>
      </div>
    );
    if (this.state.toSignup) {
      form = (
        <div style={{ marginTop: "10%" }} className={clsses.form}>
          <div>
            <h1>{this.state.toSignup ? "SignUp Here" : "Login"}</h1>
            <form onSubmit={this.onFormSubmitHandler}>
              <Input
                type="email"
                value={this.state.email}
                onChange={(event) => this.onChangeHandler(event,'email')}
                placeholder="Username"
                required
              />
              <Input
                type="password"
                value={this.state.password}
                onChange={(event) => this.onChangeHandler(event,'password')}
                placeholder="Password"
                required
              />
              <Input
                type="password"
                value={this.state.retype}
                onChange={(event) => this.onChangeHandler(event,'retype')}
                placeholder="Re-type Password"
                required
              />

              <button >{this.state.toSignup ? "Signup" : "Login"}</button>
            </form>
            <br></br>
            <button onClick={this.onSwitchSignupHandler}>
              {!this.state.toSignup ? "New Member??" : "Switch to Login"}
            </button>
          </div>
        </div>
      );
    }
    return <div>
      {redirect}
      {form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthanticated:state.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return { onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
