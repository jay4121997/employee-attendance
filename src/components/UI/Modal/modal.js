import React from "react";
import classes from "./modal.module.css";
import Auxx from "../../../hoc/auux/auxx";
import Backdrop from "../Backdrop/backdrop";

const modal = (props) => {
  return (
    <Auxx>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateX(0)" : "translateX(-100Vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxx>
  );
};

export default modal;
