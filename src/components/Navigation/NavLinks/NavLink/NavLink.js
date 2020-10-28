import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLink.module.css";

const Navlink = (props) => {
  return (
    <li className={classes.Link}>
      <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};
export default Navlink;
