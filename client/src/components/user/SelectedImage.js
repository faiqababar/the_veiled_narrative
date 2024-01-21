import React from "react";
import { useHistory } from "react-router-dom";
import "./selected-image.scss";

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const SelectedImage = ({ photo, direction, top, left, postTitle, postId }) => {
  const history = useHistory();

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnClick = (e) => {
    console.log("Selected image ", e);
    history.push(`/blog/post/${postId}`);
  };

  return (
    <div
      className="main-div"
      style={{
        margin: "2px",
        height: photo.height,
        width: photo.width,
        ...cont,
      }}
    >
      <img
        className="post-image"
        alt={photo.title}
        {...photo}
        onClick={handleOnClick}
      />

      <div className="middle">
        <div className="title">{postTitle}</div>
      </div>
    </div>
  );
};

export default SelectedImage;
