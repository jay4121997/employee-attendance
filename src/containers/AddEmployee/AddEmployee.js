import React, { Component } from "react";
import {Link} from 'react-router-dom'

import Input from "../../components/UI/input/input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/allActions";

import classes from "./AddEmployee.module.css";

class AddEmployee extends Component {
  state = {
    employeeData: {
      id: '',
      name: '',
      rate: '',
      hrs: 0,
      userId:''
    },
  };
  onChangeHandler(event, name) {
    let updatedState = { ...this.state };
    updatedState.employeeData = { ...this.state.employeeData };
    updatedState.employeeData[name] = event.target.value;
    this.setState({ employeeData: updatedState.employeeData });
  }
  addEmployeeHandler = (event) => {
    event.preventDefault();
    let empData = {
      ...this.state.employeeData,
      userId:this.props.userId
    }
   
    this.props.addEmployee(empData,this.props.token);
  };
  render() {
    let pageContent = <Link to='/auth' className={classes.goToLogin}>Login to Add</Link>
    if (this.props.isAuthanticated) {
      pageContent=(<div>
        <div style={{ marginTop: "10%" }} className={classes.form}>
          <div>
            <h1>Employee Details</h1>
            <form onSubmit={this.addEmployeeHandler}>
              <Input
                type="text"
                value={this.state.employeeData.id}
                onChange={(event) => this.onChangeHandler(event, "id")}
                placeholder="EmployeeID"
                required
              />
              <Input
                type="text"
                value={this.state.employeeData.name}
                onChange={(event) => this.onChangeHandler(event, "name")}
                placeholder="Name"
                required
              />
              <Input
                type="number"
                value={this.state.employeeData.rate}
                onChange={(event) => this.onChangeHandler(event, "rate")}
                placeholder="Rate"
                required
              />
              <button>ADD NOW</button>
            </form>
          </div>
        </div>
      </div>)
    }
    return pageContent
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthanticated: state.token !== null,
    token: state.token,
    userId:state.userId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (empData,token) => dispatch(actions.addEmployee(empData,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
