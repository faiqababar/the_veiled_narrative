import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Blog from "../components/user/Blog";
import {
  deletePost,
  enablePublishFlag,
  disablePublishFlag,
} from "../actions/postActions";

const BlogPage = ({
  isAuthenticated,
  posts,
  history,
  deletePost,
  enablePublishFlag,
  disablePublishFlag,
}) => {
  React.useEffect(() => {
    console.log("Disabling publish flag from Blog Page");
    disablePublishFlag();

    return () => {
      console.log("Enabling publish flag from Blog Page");
      enablePublishFlag();
    };
  });

  return (
    <Blog
      posts={posts}
      auth={isAuthenticated}
      history={history}
      deletePost={deletePost}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
  post: state.post.post,
});

BlogPage.propTypes = {
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired,
  disablePublishFlag: PropTypes.func.isRequired,
  enablePublishFlag: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  deletePost,
  enablePublishFlag,
  disablePublishFlag,
})(BlogPage);
