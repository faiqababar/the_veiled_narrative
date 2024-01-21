import React from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}

function postFilter(post) {
  let filteredPost = {
    postTitle: post.title,
    src: post.image,
    width: Number(post.imageWidth),
    height: Number(post.imageHeight),
    postId: post._id,
  };
  return filteredPost;
}

const HomePage = ({ posts }) => {
  const [postsLoaded, setPostsLoaded] = React.useState(false);
  let filteredPosts;

  React.useEffect(() => {
    setTimeout(() => {
      posts.length === 0 ? setPostsLoaded(false) : setPostsLoaded(true);
    }, 1000);
  }, [posts]);

  if (postsLoaded) {
    filteredPosts = posts.map(postFilter);
  }

  const imageRenderer = React.useCallback(
    ({ index, left, top, key, photo, direction }) => (
      <SelectedImage
        key={key}
        photo={photo}
        left={left}
        top={top}
        postTitle={filteredPosts[index].postTitle}
        postId={filteredPosts[index].postId}
        direction={direction}
      />
    ),
    [filteredPosts]
  );

  return (
    <div>
      {postsLoaded && filteredPosts.length > 0 ? (
        <Gallery
          photos={filteredPosts}
          direction="column"
          renderImage={imageRenderer}
          columns={columns}
          margin="3"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
