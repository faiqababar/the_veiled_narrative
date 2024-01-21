import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { incrementSkip, getPostsByOffset } from "./actions/postActions";

import LoginPage from "./containers/auth/LoginPage";
import SignUpPage from "./containers/auth/SignUpPage";

import Drawer from "./containers/layout/Drawer";
import ProgressBar from "./containers/layout/ProgressBar";
import NavigationBar from "./containers/layout/NavigationBar";

import HomePage from "./containers/HomePage";
import Footer from "./components/layout/Footer";
import About from "./components/user/About";
import BlogPage from "./containers/BlogPage";
import PrivateRoute from "./utils/PrivateRoute";

import ViewPostPage from "./containers/posts/ViewPostPage";
import SubmitPostPage from "./containers/posts/SubmitPostPage";
import CreatePostPage from "./containers/posts/CreatePostPage";
import UpdatePostPage from "./containers/posts/UpdatePostPage";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./loginPage";
  }
}
const App = () => {
  const [skip, setSkip] = React.useState(0);

  React.useEffect(() => {
    if (!store.getState().post.fetching) {
      console.log("Post fetching is disabled...");
      return;
    }

    const fetchPosts = async () => {
      console.log(
        "Publish is currently set to: " + store.getState().post.publishFlag
      );
      store.dispatch(
        getPostsByOffset(skip, 14, store.getState().post.publishFlag)
      );
    };

    fetchPosts();
  }, [skip]);

  const handleScroll = (e) => {
    if (!store.getState().post.fetching) {
      console.log("Post fetching is disabled...");
      return;
    }

    let { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight - 1) {
      store.dispatch(incrementSkip());
      console.log(store.getState().post.skip);
      setSkip(store.getState().post.skip);
      console.log("Loading more posts");
    }
  };

  return (
    <div
      id="main-body-div"
      style={{
        height: "100vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
      }}
      onScroll={handleScroll}
    >
      <Provider store={store}>
        <ProgressBar />
        <NavigationBar />
        <Drawer />
        <main style={{ marginTop: 70 }}></main>
        <div style={{ flexGrow: 1 }}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/uaxxc56/5674cvx/signup" component={SignUpPage} />
            <Route path="/submit" component={SubmitPostPage} />
            <Route path="/about" component={About} />
            <PrivateRoute exact path="/blog" component={BlogPage} />
            <PrivateRoute
              exact
              path="/blog/post/create"
              component={CreatePostPage}
            />
            <PrivateRoute
              exact
              path="/blog/post/update/:id"
              component={UpdatePostPage}
            />
            <Route exact path="/blog/post/:id" component={ViewPostPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Provider>

      <Footer />
    </div>
  );
};

export default App;
