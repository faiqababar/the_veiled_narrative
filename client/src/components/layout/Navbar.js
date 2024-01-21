import React from "react";
import PropTypes from "prop-types";
import imageLogo from "../../images/image-logo.png";
import textLogo from "../../images/text-logo.png";
import subTextLogo from "../../images/sub-text-logo.png";
import DrawerToggleMenu from "./DrawerToggleMenu";
import { Link } from "react-router-dom";
import "./layout.scss";

const Navbar = ({ auth, logoutOnClick, sideDrawerOnClick }) => {
  const homeClass =
    window.location.pathname === "/home" || window.location.pathname === "/"
      ? "toolbar_active_link"
      : "";
  const aboutClass = window.location.pathname.match(/^\/about/)
    ? "toolbar_active_link"
    : "";
  const submissionsClass = window.location.pathname.match(/^\/submit/)
    ? "toolbar_active_link"
    : "";
  const blogClass = window.location.pathname.match(/^\/blog/)
    ? "toolbar_active_link"
    : "";

  return (
    <header className="toolbar">
      <nav className="toolbar_navigation justify-content-between">
        <div className="spacer_div_left"></div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="toolbar_logo">
            <img
              src={imageLogo}
              style={{
                maxHeight: 80,
                maxWidth: 100,
              }}
              className="image_logo ml-4"
              alt="faces"
            />
            <img
              src={textLogo}
              style={{
                maxHeight: 120,
                maxWidth: 350,
              }}
              className="text_logo"
              alt="text"
            />
            <br />
            <img
              src={subTextLogo}
              style={{
                maxHeight: 50,
                maxWidth: 500,
              }}
              className="sub_text_logo"
              alt="subtext"
            />
          </div>
        </Link>
        <div className="spacer_div_right"></div>

        {auth ? (
          <div className="logout_button" onClick={logoutOnClick}>
            Logout
          </div>
        ) : (
          <div className="logout_button2" style={{ color: "white" }}>
            logout
          </div>
        )}
      </nav>
      <hr />
      <div className="toolbar_toggle_menu">
        <DrawerToggleMenu sideDrawerOnClick={sideDrawerOnClick} />
      </div>

      <div className="toolbar_navigation_items justify-content-center">
        <ul className="nav">
          <li>
            <a className={homeClass} href="/home">
              Home{" "}
            </a>
          </li>
          {auth ? (
            <li>
              <a className={blogClass} href="/blog">
                Posts
              </a>
            </li>
          ) : (
            ""
          )}
          <li>
            <a className={submissionsClass} href="/submit">
              Submit{" "}
            </a>
          </li>
          <li>
            <a className={aboutClass} href="/about">
              About
            </a>
          </li>
        </ul>
      </div>
      <hr />
    </header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.bool.isRequired,
  logoutOnClick: PropTypes.func.isRequired,
  sideDrawerOnClick: PropTypes.func.isRequired,
};

export default Navbar;
