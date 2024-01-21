import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";
import "./post.scss";

const ListPost = ({ posts, history, deletePost }) => {
  return (
    <div className="grid-container justify-content-center">
      {posts.map((post) => (
        <Post post={post} deletePost={deletePost} history={history} />
      ))}
    </div>
  );
};

ListPost.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default ListPost;
