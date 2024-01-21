import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "../components/user/Home";

const HomePage = ({ posts }) => {
  return <Home posts={posts} />;
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

HomePage.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(HomePage);
