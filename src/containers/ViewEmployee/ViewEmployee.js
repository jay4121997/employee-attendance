import React, { Component } from "react";
import { Link } from "react-router-dom";

import Employee from "../../components/employee/Employee";
import Auxx from "../../hoc/auux/auxx";
import Modal from "../../components/UI/Modal/modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/allActions";

import classes from "./ViewEmployee.module.css";

class viewEmployee extends Component {
  state = {
    showModal: false,
    currentEmployee: {
      key: "",
      id: "",
      name: "",
      hrs: "",
      rate: "",
    },
  };
  componentDidMount() {
    if (this.props.isAuthanticated) {
      if (!this.props.fetched) {
      this.props.viewEmployee(this.props.token, this.props.userId);
      }
    }
  }
  modalCloseHandler = (props) => {
    this.setState({ showModal: !this.state.showModal });
  };
  editHandler = (name, id, rate, hrs, key) => {
    let updatedCurrentEmployee = { ...this.state.currentEmployee };
    updatedCurrentEmployee.name = name;
    updatedCurrentEmployee.id = id;
    updatedCurrentEmployee.rate = rate;
    updatedCurrentEmployee.hrs = hrs;
    updatedCurrentEmployee.key = key;
    this.setState({ showModal: true, currentEmployee: updatedCurrentEmployee });
  };
  editFormSubmitHandler = (event) => {
    event.preventDefault();

    // this.props.updateEmployee(key,this.props.userId)
    this.props.updateEmployee(
      this.state.currentEmployee.key,
      this.state.currentEmployee.hrs,
      this.state.currentEmployee.id,
      this.state.currentEmployee.name,
      this.state.currentEmployee.rate,
      this.props.userId,
      this.props.token
    );
  };
  inputChangeHandler = (event, title) => {
    const updatedEmp = { ...this.state.currentEmployee };
    updatedEmp[title] = event.target.value;
    this.setState({ currentEmployee: updatedEmp });
  };
  render() {
    let display = (
      <Auxx>
        <Link to="/auth" className={classes.goToLogin}>
          Login to view
        </Link>
      </Auxx>
    );
    if (this.props.isAuthanticated && this.props.fetched) {
      display = (
        <div>
          <Modal
            show={this.state.showModal}
            modalClosed={this.modalCloseHandler}
          >
            {
              <div className={classes.Form}>
                <form
                  onSubmit={(event) =>
                    this.editFormSubmitHandler(
                      event,
                      this.state.currentEmployee.name,
                      this.state.currentEmployee.id,
                      this.state.currentEmployee.hrs,
                      this.state.currentEmployee.rate,
                      this.state.currentEmployee.key
                    )
                  }
                >
                  <div>
                    <label>Name</label>
                    <input
                      value={this.state.currentEmployee.name}
                      onChange={(event) =>
                        this.inputChangeHandler(event, "name")
                      }
                    />
                    <label>Id</label>
                    <input
                      value={this.state.currentEmployee.id}
                      onChange={(event) => this.inputChangeHandler(event, "id")}
                    />
                    <label>Rate</label>
                    <input
                      value={this.state.currentEmployee.rate}
                      onChange={(event) =>
                        this.inputChangeHandler(event, "rate")
                      }
                    />
                    <label>Hrs</label>
                    <input
                      value={this.state.currentEmployee.hrs}
                      onChange={(event) =>
                        this.inputChangeHandler(event, "hrs")
                      }
                    />
                    <button>SAVE</button>
                  </div>
                </form>
              </div>
            }
          </Modal>

          <div className={classes.pad}>
            <div className={classes.flexbox}>
              {this.props.employees.length !==0 ? (this.props.employees.map((val) => (
                <Employee
                  key={val.keyID}
                  id={val.id}
                  name={val.name}
                  hrs={val.hrs}
                  rate={val.rate}
                  pay={val.rate * val.hrs}
                  clicked={() =>
                    this.editHandler(
                      val.name,
                      val.id,
                      val.rate,
                      val.hrs,
                      val.keyID
                    )
                  }
                />
              ))) : <p  className={classes.blank}>No employees to show </p>}
            </div>
          </div>
        </div>
      );
    }
    return display;
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    fetched: state.fetched,
    isAuthanticated: state.token !== null,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewEmployee: (token, userId) =>
      dispatch(actions.viewEmployee(token, userId)),
    updateEmployee: (key, hrs, id, name, rate, userId, token) =>
      dispatch(actions.updateEmployee(key, hrs, id, name, rate, userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(viewEmployee);
