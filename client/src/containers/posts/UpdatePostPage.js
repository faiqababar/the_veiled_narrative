import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";
import { connect } from "react-redux";
import {
  getPostByID,
  updatePost,
  enablePostsFetching,
  disablePostsFetching,
} from "../../actions/postActions";

const UpdatePostPage = ({
  errors,
  updatePost,
  loading,
  currentPost,
  getPostByID,
  match,
  enablePostsFetching,
  disablePostsFetching,
}) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    author: "",
    image: "",
    imageWidth: "",
    imageHeight: "",
    formTitle: "",
    publish: false,
    oldImage: "",
    errors: {},
  });

  useEffect(() => {
    disablePostsFetching();
    getPostByID(match.params.id, false);

    return () => {
      enablePostsFetching();
    };
  }, [match, getPostByID]);

  // updating the local state of post with the received post data
  useEffect(() => {
    setPost((post) => ({
      title: currentPost.title,
      body: currentPost.body,
      author: currentPost.author,
      image: currentPost.image,
      imageWidth: currentPost.imageWidth,
      imageHeight: currentPost.imageHeight,
      oldImage: currentPost.image,
      publish: currentPost.publish,
      errors: { ...post.errors },
      formTitle: "Update Post",
    }));
  }, [currentPost]);

  useEffect(() => {
    setPost((post) => {
      return { ...post, errors };
    });
  }, [errors]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPost({
      ...post,
      publish: e.target.checked,
    });
  };

  const handleBodyChange = (e) => {
    setPost({
      ...post,
      body: e,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      let image = URL.createObjectURL(e.target.files[0]);

      const error = {
        ...post.errors,
        ...Validate("image", e.target.files[0]).errors,
      };

      if (error.image !== "") {
        image = "";
      }

      setPost({
        ...post,
        imageFile: e.target.files[0],
        image: image,
        errors: { ...error },
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = { ...post.errors, ...Validate(name, value).errors };
    setPost({ ...post, errors: { ...error } });
  };

  const handleBodyBlur = (previousRange, source, editor) => {
    const name = "body";
    const value = editor.getText();

    const error = { ...post.errors, ...Validate(name, value).errors };
    setPost({ ...post, errors: { ...error } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //disable button to prevent multiple clicks
    e.target.disabled = true;

    let error = {
      ...post.errors,
      ...Validate("title", post.title).errors,
    };
    if (error.title !== "") {
      setPost({
        ...post,
        errors: { ...error },
      });
      e.target.disabled = false;
      return;
    }

    error = {
      ...post.errors,
      ...Validate("author", post.author).errors,
    };
    if (error.author !== "") {
      setPost({
        ...post,
        errors: { ...error },
      });
      e.target.disabled = false;
      return;
    }

    error = {
      ...post.errors,
      ...Validate("body", post.body).errors,
    };
    if (error.body !== "") {
      setPost({
        ...post,
        errors: { ...error },
      });
      e.target.disabled = false;
      return;
    }

    const {
      title,
      author,
      body,
      imageFile,
      imageWidth,
      imageHeight,
      oldImage,
      publish,
    } = post;
    const image = imageFile;
    updatePost(
      currentPost._id,
      {
        title,
        author,
        body,
        image,
        imageWidth,
        imageHeight,
        publish,
      },
      oldImage
    );
  };

  // to ensure that the post is loaded otherwise we would make uncontrolled form access error
  const isPostLoaded = () => {
    return (
      post.title ||
      post.body ||
      post.image ||
      post.author ||
      Object.keys(post.errors).length > 0
    );
  };

  return isPostLoaded() ? (
    <PostForm
      loading={loading}
      post={post}
      onChange={handleChange}
      onBodyChange={handleBodyChange}
      onFileChange={handleFileChange}
      onCheckboxChange={handleCheckboxChange}
      onBlur={handleBlur}
      onBodyBlur={handleBodyBlur}
      onSubmit={handleSubmit}
      hidePublish={false}
    />
  ) : (
    <div />
  );
};

const mapStateToProps = (state) => ({
  currentPost: state.post.post,
  loading: state.post.postLoading,
  errors: state.errors,
});

UpdatePostPage.propTypes = {
  currentPost: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getPostByID: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  enablePostsFetching: PropTypes.func.isRequired,
  disablePostsFetching: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getPostByID,
  updatePost,
  enablePostsFetching,
  disablePostsFetching,
})(UpdatePostPage);
