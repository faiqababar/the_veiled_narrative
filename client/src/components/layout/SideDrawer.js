import React from "react";

import "./layout.scss";

const SideDrawer = ({ logoutOnClick, auth }) => {
  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        {auth ? (
          <li>
            <a href="/blog">Posts</a>
          </li>
        ) : (
          ""
        )}
        <li>
          <a href="/submit">Submit</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {auth ? (
          <li>
            <a href="/home" onClick={logoutOnClick}>
              Logout
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default SideDrawer;
