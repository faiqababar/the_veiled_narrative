import axios from "axios";
import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  RESET_POST,
  INCREMENT_SKIP,
  ENABLE_POSTS_FETCHING,
  DISABLE_POSTS_FETCHING,
  ENABLE_PUBLISH_FLAG,
  DISABLE_PUBLISH_FLAG,
} from "./types";
import { setErrors, clearErrors } from "./errorActions";
import * as Constants from "../utils/Constants";

export const createPost = (postData, routeUrl) => (dispatch) => {
  dispatch(togglePostLoading());

  if (postData.image === "") {
    console.log("No image data");
    axios
      .post(Constants.CREATE_POST_URL, postData)
      .then((res) => {
        dispatch({
          type: CREATE_POST,
          payload: res.data,
        });
        dispatch(togglePostLoading());
        window.location.href = routeUrl;
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
        dispatch(togglePostLoading());
      });
  }
  // handle image file upload, image will be uploaded to cloudinary and the returned url will be saved in the database with post
  const data = new FormData();
  data.append("file", postData.image);
  data.append("upload_preset", Constants.CLOUDINARY_IMAGE_UPLOAD_PRESET);

  fetch(Constants.CLOUDINARY_IMAGE_UPLOAD_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then(
      (file) => {
        console.log("Cloudinary uploaded image url ", file.secure_url);
        postData.image = file.secure_url;

        // we need certain width height of images for our gallery component on homepage. So translate image width and height according to that
        if (file.width < file.height) {
          postData.imageWidth = 3;
          postData.imageHeight = 4;
        } else if (file.width > file.height) {
          postData.imageWidth = 4;
          postData.imageHeight = 3;
        } else {
          postData.imageWidth = 1;
          postData.imageHeight = 1;
        }
        axios
          .post(Constants.CREATE_POST_URL, postData)
          .then((res) => {
            dispatch({
              type: CREATE_POST,
              payload: res.data,
            });
            dispatch(togglePostLoading());
            window.location.href = routeUrl;
          })
          .catch((err) => {
            dispatch(setErrors(err.response.data));
            dispatch(togglePostLoading());
          });
      },
      (error) => {
        console.log("Image upload error: ", error);
        dispatch(togglePostLoading());
      }
    );
};

export const updatePost = (id, postData, oldImage) => (dispatch) => {
  // if image is not updated, no need to upload the image to cloudinary account. Just update the rest of the posts attributes
  if (typeof postData.image == "undefined") {
    console.log("Updating post");
    postData.image = oldImage;
    dispatch(togglePostLoading());
    axios
      .patch(Constants.UPDATE_POST_URL + id, postData)
      .then((res) => {
        dispatch({
          type: UPDATE_POST,
          payload: res.data,
        });
        dispatch(togglePostLoading());
        window.location.href = Constants.VIEW_POST_LOCATION + id;
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
        dispatch(togglePostLoading());
      });
    return;
  }

  // upload the updates image to the cloudinary account and update post
  dispatch(togglePostLoading());

  // handle file upload
  const data = new FormData();
  data.append("file", postData.image);
  data.append("upload_preset", Constants.CLOUDINARY_IMAGE_UPLOAD_PRESET);

  fetch(Constants.CLOUDINARY_IMAGE_UPLOAD_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then(
      (file) => {
        console.log("Cloudinary uploaded image url ", file.secure_url);
        postData.image = file.secure_url;

        // we need certain width height of images for our gallery component on homepage. So translate image width and height according to that
        if (file.width < file.height) {
          postData.imageWidth = 3;
          postData.imageHeight = 4;
        } else if (file.width > file.height) {
          postData.imageWidth = 4;
          postData.imageHeight = 3;
        } else {
          postData.imageWidth = 1;
          postData.imageHeight = 1;
        }

        axios
          .patch(Constants.UPDATE_POST_URL + id, postData)
          .then((res) => {
            dispatch({
              type: UPDATE_POST,
              payload: res.data,
            });
            dispatch(togglePostLoading());
            window.location.href = Constants.VIEW_POST_LOCATION + id;
          })
          .catch((err) => {
            dispatch(setErrors(err.response.data));
            dispatch(togglePostLoading());
          });
      },
      (error) => {
        console.log("Cloudinary image upload error: ", error);
        dispatch(togglePostLoading());
      }
    );
};

export const getPostByID = (id, publishFlag) => (dispatch) => {
  dispatch(togglePostLoading());
  axios
    .get(Constants.GET_POST_BY_ID_URL + `${id}/${publishFlag}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(togglePostLoading());
    })

    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostLoading());
    });
};

// skip is the offset, like where to start fetching
// limit is the number of posts to fetch from API
// if publishFlag is set to true then it means that get only published posts otherwise get all posts
export const getPostsByOffset = (skip, limit, publishFlag) => (dispatch) => {
  dispatch(togglePostsLoading());
  axios
    .get(Constants.GET_POSTS_BY_OFFSET_URL + `${skip}/${limit}/${publishFlag}`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(togglePostsLoading());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostsLoading());
    });
};

export const deletePost = (id, history) => (dispatch) => {
  dispatch(togglePostLoading());
  axios
    .delete(Constants.DELETE_POST + id)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(togglePostLoading());
      history.push("/blog");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(togglePostLoading());
    });
};

export const resetPost = () => {
  return {
    type: RESET_POST,
  };
};

export const togglePostLoading = () => {
  return {
    type: TOGGLE_POST_LOADING,
  };
};

export const togglePostsLoading = () => {
  return {
    type: TOGGLE_POSTS_LOADING,
  };
};

export const incrementSkip = () => {
  return {
    type: INCREMENT_SKIP,
  };
};

export const enablePostsFetching = () => {
  console.log("Enabling posts fetching");
  return {
    type: ENABLE_POSTS_FETCHING,
  };
};

export const disablePostsFetching = () => {
  console.log("Diabling posts fetching");
  return {
    type: DISABLE_POSTS_FETCHING,
  };
};

export const enablePublishFlag = () => {
  console.log("Setting publish flag to true");
  return {
    type: ENABLE_PUBLISH_FLAG,
  };
};
export const disablePublishFlag = () => {
  console.log("Setting publish flag to all");
  return {
    type: DISABLE_PUBLISH_FLAG,
  };
};
