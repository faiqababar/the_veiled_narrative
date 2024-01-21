import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Textarea from "../form/Textarea";
import "./post.scss";

const PostForm = ({
  post,
  onChange,
  onBodyChange,
  onFileChange,
  onCheckboxChange,
  onBlur,
  onBodyBlur,
  loading,
  onSubmit,
  onAnonymousCheckboxChange,
  hidePublish,
}) => {
  const { title, publish, author, body, formTitle, errors } = post;
  return (
    <Container>
      <Row>
        <Col className="mx-auto">
          <Form noValidate onSubmit={onSubmit} className="p-sm-3 p-xs-1">
            <Form.Text
              className="my-2"
              style={{ color: "Black", fontSize: "1.6rem", fontWeight: "bold" }}
            >
              {formTitle}
            </Form.Text>
            <Form.Group controlId="titleInput">
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={errors.title ? true : false}
                className="custom-input"
              />
              <Form.Text style={{ color: "red" }}>{errors.title}</Form.Text>
            </Form.Group>
            <Form.Group controlId="authorInput">
              <Form.Control
                name="author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={onChange}
                isInvalid={errors.author ? true : false}
                className="custom-input"
              />
              {hidePublish ? (
                <Form.Check
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  name="checkbox"
                  type="checkbox"
                  id="anonymousCheckboxInput"
                  label="Post as Anonymous"
                  onChange={onAnonymousCheckboxChange}
                />
              ) : (
                ""
              )}{" "}
              <Form.Text style={{ color: "red" }}>{errors.author}</Form.Text>
            </Form.Group>
            <Textarea
              name="body"
              placeholder="Write something.."
              value={body}
              onChange={onBodyChange}
              onBlur={onBodyBlur}
              text={{
                module: "post",
                label: "Description",
                error: errors.body,
              }}
            />
            <Form.Group controlId="imageInput">
              <Form.Control
                name="image"
                type="file"
                onChange={onFileChange}
                isInvalid={errors.image ? true : false}
              />
              <Form.Text style={{ color: "red" }}>{errors.image}</Form.Text>
              <Form.Label>
                {post.image && (
                  <img
                    className="my-2"
                    alt="article"
                    src={post.image}
                    style={{ width: "200px" }}
                  />
                )}
              </Form.Label>
              {hidePublish ? (
                ""
              ) : (
                <Form.Check
                  style={{ marginBottom: "2.5rem" }}
                  name="checkbox"
                  checked={publish}
                  type="checkbox"
                  id="checkboxInput"
                  label="Publish Article"
                  onChange={onCheckboxChange}
                />
              )}{" "}
            </Form.Group>
            <Button type="submit" disabled={loading} className="custom-btn">
              Submit
            </Button>
            {hidePublish ? (
              <Form.Text style={{ color: "grey" }}>
                <strong>Disclaimer:</strong> At the Veiled Narrative, we take
                privacy very seriously. We’re committed to providing you with
                the privacy you desire through an anonymous submission setting
                on our website. For transparency purposes, we would like you to
                understand that anonymous writers under a pseudonym will be
                signing away the rights to their work. We reserve the right to
                alter or modify your submission based on our needs. Therefore,
                we strongly recommend you contact us via email if you prefer to
                retain rights to your work.
              </Form.Text>
            ) : (
              ""
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onBodyBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;
