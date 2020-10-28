import React from "react";

import Auxx from "../../hoc/auux/auxx";

import classes from "./Employee.module.css";

const Employee = (props) => {
  return (
    <Auxx>
      <div className={[classes.flexcard, classes.flexcardOrange].join(" ")}>
        <div
          className={[
            classes.flexcardNumber,
            classes.flexcardNumberOrange,
          ].join(" ")}
        >
          ID : {props.id}
        </div>
        <div className={[classes.flex, classes.flexcardTitle].join(" ")}>
          {props.name}
        </div>
        <div className={[classes.flex, classes.flexcardText].join(" ")}>
          <ul className={classes.data}>
            <li>
              Hrs Worked:<b>{props.hrs}</b>{" "}
            </li>
            <li>
              Rate:<b>{props.rate}</b>{" "}
            </li>
            <li>
              Pay:<b>{props.pay}</b>{" "}
            </li>
          </ul>
        </div>
        {/* <div class={[classes.flex, classes.flexcardImg].join(' ')}>
          <img
            class={classes.flexcardimgItem}
            src="https://cdn.pixabay.com/photo/2017/01/10/23/01/seo-1970475_960_720.png"
            alt=""
          />
        </div> */}
        <button className={classes.EditButton} onClick={props.clicked}>Edit</button>
      </div>
    </Auxx>
  );
};

export default Employee;
