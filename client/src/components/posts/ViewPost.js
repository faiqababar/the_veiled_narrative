import React from "react";
import PropTypes from "prop-types";
import getFormattedDate from "../../utils/getFormattedDate";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as Constants from "../../utils/Constants";
import "./post.scss";

const ViewPost = ({ post, auth, onDelete, onEdit }) => {
  const postDate = getFormattedDate(post.date);
  return (
    <Container>
      {auth && (
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="light" className="mr-2" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="dark" onClick={onDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      )}
      <Container
        className="mt-4 viewPost"
        style={{ backgroundColor: "#e9e9e9", paddingBottom: "2rem" }}
      >
        <Row>
          <Col className="text-center postTitle mt-3">
            <h2>{post.title}</h2>
          </Col>
        </Row>

        <Row className="text-center small footerStyle mt-2">
          <Col>
            {post.author} | {postDate}
          </Col>
        </Row>

        {post.image && (
          <Row className="justify-content-center mt-3">
            <img alt={post.title} src={post.image} width="60%" height="50%" />
          </Row>
        )}
        <Row className="mt-3 mb-1 mx-4" style={{ whiteSpace: "pre-wrap" }}>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: "3%", marginBottom: "2%" }}>
        <Row>
          <div
            className="newsletter-div"
            onClick={() =>
              (window.location.href = Constants.MAILCHIMP_SUBSCRIBER_FORM_URL)
            }
          >
            Subscribe to our Newsletter!
          </div>
        </Row>
      </Container>
    </Container>
  );
};

ViewPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ViewPost;
