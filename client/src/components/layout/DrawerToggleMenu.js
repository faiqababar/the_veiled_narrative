import React from "react";
import "./layout.scss";

const DrawerToggleMenu = (props) => {
  return (
    <div className="toggle-menu">
      <p onClick={props.sideDrawerOnClick}>Menu</p>
    </div>
  );
};

export default DrawerToggleMenu;
