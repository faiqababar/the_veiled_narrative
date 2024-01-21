import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/layout/Navbar";
import { connect } from "react-redux";
import { logoutUser, toggleSideDrawer } from "../../actions/authActions";

const NavigationBar = ({ auth, logoutUser, toggleSideDrawer }) => {
  const logoutOnClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const sideDrawerOnClick = (e) => {
    e.preventDefault();
    toggleSideDrawer();
  };

  return (
    <Navbar
      auth={auth.isAuthenticated}
      logoutOnClick={logoutOnClick}
      sideDrawerOnClick={sideDrawerOnClick}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleSideDrawer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser, toggleSideDrawer })(
  NavigationBar
);
