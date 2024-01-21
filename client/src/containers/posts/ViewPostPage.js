import React, { useEffect } from "react";
import ViewPost from "../../components/posts/ViewPost";
import {
  deletePost,
  getPostByID,
  disablePostsFetching,
  enablePostsFetching,
  disablePublishFlag,
} from "../../actions/postActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Constants from "../../utils/Constants";

const ViewPostPage = ({
  auth,
  post,
  publishFlag,
  match,
  history,
  getPostByID,
  enablePostsFetching,
  disablePostsFetching,
  deletePost,
}) => {
  useEffect(() => {
    // allow admin to view all posts
    if (auth) {
      publishFlag = false;
    }

    disablePostsFetching();
    console.log("Publish Flag in View Post Page, ", publishFlag);
    getPostByID(match.params.id, publishFlag);
    return () => {
      enablePostsFetching();
    };
  }, [match, getPostByID]);

  const handleEdit = () => {
    history.push(Constants.UPDATE_POST_LOCATION + post._id);
  };

  const handleDelete = () => {
    deletePost(post._id, history);
  };

  if (Object.keys(post).length === 0) return <div />;
  return (
    <ViewPost
      post={post}
      auth={auth}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  post: state.post.post,
  publishFlag: state.post.publishFlag,
});

ViewPostPage.propTypes = {
  auth: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  publishFlag: PropTypes.bool.isRequired,
  getPostByID: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  enablePostsFetching: PropTypes.func.isRequired,
  disablePostsFetching: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getPostByID,
  deletePost,
  enablePostsFetching,
  disablePostsFetching,
})(ViewPostPage);
