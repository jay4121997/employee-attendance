import React from "react";

import Navlink from "./NavLink/NavLink";

import classes from "./Navlinks.module.css";

const Navlinks = (props) => {
  return (
    <ul className={classes.Links}>
      <Navlink link="/" exact>
        View
      </Navlink>
      <Navlink link="/addnew" exact>
        Add
      </Navlink>
      {props.isAuthanticated ? <Navlink link="/logout">Logout</Navlink> :<Navlink link="/auth">Login</Navlink> }
    </ul>
  );
};

export default Navlinks;
