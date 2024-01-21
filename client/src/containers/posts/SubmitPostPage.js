import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";
import { connect } from "react-redux";
import {
  createPost,
  disablePostsFetching,
  enablePostsFetching,
} from "../../actions/postActions";
import * as Constants from "../../utils/Constants";

const SubmitPostPage = ({
  errors,
  createPost,
  enablePostsFetching,
  disablePostsFetching,
  loading,
}) => {
  const [post, setPost] = useState({
    title: "",
    author: "",
    body: "",
    image: "",
    imageFile: "",
    imageWidth: "",
    imageHeight: "",
    publish: false,
    formTitle: "Submit Post",
    errors: {},
  });

  useEffect(() => {
    disablePostsFetching();
    setPost((post) => {
      return { ...post, errors };
    });
    return () => {
      enablePostsFetching();
    };
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

  const handleAnonymousCheckboxChange = (e) => {
    let authorName = post.author === "" ? "Anonymous" : "";
    setPost({
      ...post,
      author: authorName,
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

    /* error = {
      ...post.errors,
      ...Validate("image", post.imageFile).errors,
    };

    if (error.image !== "") {
      setPost({
        ...post,
        errors: { ...error },
      });

      e.target.disabled = false;
      return;
    } */

    const {
      title,
      author,
      body,
      imageFile,
      imageWidth,
      imageHeight,
      publish,
    } = post;
    const image = imageFile;
    const routeUrl = Constants.HOME_LOCATION;
    post.author = post.author === "" ? "Anonymous" : post.author;
    createPost(
      {
        title,
        author,
        body,
        image,
        imageWidth,
        imageHeight,
        publish,
      },
      routeUrl
    );
  };

  return (
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
      hidePublish={true}
      onAnonymousCheckboxChange={handleAnonymousCheckboxChange}
    />
  );
};

const mapStateToProps = (state) => ({
  loading: state.post.postLoading,
  errors: state.errors,
});

SubmitPostPage.propTypes = {
  createPost: PropTypes.func.isRequired,
  enablePostsFetching: PropTypes.func.isRequired,
  disablePostsFetching: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  createPost,
  disablePostsFetching,
  enablePostsFetching,
})(SubmitPostPage);
