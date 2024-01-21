import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import getFormattedDate from "../../utils/getFormattedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./post.scss";

const Post = ({ post, history, deletePost }) => {
  const postDate = getFormattedDate(post.date);
  let cardBorder = "";

  post.publish
    ? (cardBorder = "3px solid black") //#80b8cb
    : (cardBorder = "3px dashed black"); //#ea7b7b
  return (
    <Card
      style={{
        border: cardBorder,
      }}
    >
      <Card.Body className="postCover">
        {" "}
        <Link to={`/blog/post/${post._id}`} key={post._id}>
          <small
            style={{
              fontSize: "1.0em",
              color: "black",
            }}
          >
            {post.title}
          </small>
          {""}
        </Link>
      </Card.Body>
      <Card.Footer
        style={{
          background: "#d9d9d9",
        }}
      >
        <div className="text-left">
          <span onClick={() => history.push(`/blog/post/update/${post._id}`)}>
            <FontAwesomeIcon
              style={{
                color: "#455054",
              }}
              className="mr-3 hvr_icon"
              icon={faPen}
            />
          </span>
          |
          <span className="" onClick={() => deletePost(post._id, history)}>
            {""}
            <FontAwesomeIcon
              style={{
                color: "#455054",
              }}
              className="ml-3 hvr_icon"
              icon={faTrash}
            />
          </span>
          <span
            style={{
              float: "right",
            }}
          >
            <small style={{ color: "black" }}>Last Modified: {postDate}</small>
          </span>
        </div>
      </Card.Footer>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
