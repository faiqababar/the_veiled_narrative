import React from "react";
import PropTypes from "prop-types";
import SideDrawer from "../../components/layout/SideDrawer";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { lockWindowScroll, unLockWindowScroll } from "../../utils/Utils";

const Drawer = ({ sideDrawerOpen, isAuthenticated, logoutUser }) => {
  let drawerAndBackdrop = "";
  if (sideDrawerOpen) {
    drawerAndBackdrop = (
      <SideDrawer auth={isAuthenticated} logoutOnClick={logoutUser} />
    );
    // lock scroll so background doesn't scroll
    lockWindowScroll();
  } else if (document.getElementById("main-body-div")) {
    unLockWindowScroll();
  }
  return drawerAndBackdrop;
};

const mapStateToProps = (state) => ({
  sideDrawerOpen: state.auth.sideDrawerOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

Drawer.propTypes = {
  sideDrawerOpen: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser })(Drawer);
