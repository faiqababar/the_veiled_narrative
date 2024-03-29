import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Nav, Button, Container, Form } from "react-bootstrap";
import ListPost from "../posts/ListPost";
import "./blog.scss";

const Blog = ({ posts, auth, history, deletePost }) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);

  const handleChange = (e) => {
    setSearch(inputRef.current.value.toLowerCase());
  };

  // setting no post found after waiting for a second
  useEffect(() => {
    setTimeout(() => {
      if (posts.length === 0) setDisplay(true);
    }, 1000);
  }, [posts]);

  return (
    <React.Fragment>
      <div className="mx-3">
        <Nav className="justify-content-between mt-2 mb-2 ml-4 mr-4">
          {auth && (
            <Link to="/blog/post/create">
              <Button variant="light" className="styleBtn">
                +
              </Button>
            </Link>
          )}
          <Form>
            <Form.Group controlId="searchBar">
              <Form.Control
                type="text"
                placeholder="Search post..."
                style={{
                  height: 40,
                  borderRadius: 0,
                  border: "1px solid #d3d3d3",
                }}
                ref={inputRef}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Nav>
      </div>
      {posts.length > 0 ? (
        <ListPost
          posts={posts.filter(
            (post) =>
              post.title.toLowerCase().includes(search) ||
              post.body.toLowerCase().includes(search) ||
              post.author.toLowerCase().includes(search)
          )}
          history={history}
          deletePost={deletePost}
        />
      ) : (
        display && (
          <Container
            style={{ height: "50vh" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            {" "}
            <p className="text-secondary h3">No posts yet!</p>
          </Container>
        )
      )}
    </React.Fragment>
  );
};

Blog.propTypes = {
  auth: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

export default Blog;
