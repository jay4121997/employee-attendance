import React from "react";

import NavLinks from "../NavLinks/Navlinks";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <header className={classes.Navbar}>
      <nav  >
        <NavLinks isAuthanticated={props.isAuthanticated} />
      </nav>
    </header>
  );
};
export default Navbar;
