import {
  RESET_POST,
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  INCREMENT_SKIP,
  ENABLE_POSTS_FETCHING,
  DISABLE_POSTS_FETCHING,
  ENABLE_PUBLISH_FLAG,
  DISABLE_PUBLISH_FLAG,
} from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  postLoading: false,
  postsLoading: false,
  skip: 0,
  fetching: true,
  publishFlag: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case GET_POSTS:
      return {
        ...state,
        post: {},
        posts: [...state.posts, ...action.payload],
      };
    case GET_POST:
      return {
        ...state,
        post: { ...action.payload[0] },
      };
    case UPDATE_POST:
      const posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        post: {},
        posts: [...posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case TOGGLE_POST_LOADING:
      return {
        ...state,
        postLoading: !state.postLoading,
      };
    case TOGGLE_POSTS_LOADING:
      return {
        ...state,
        postsLoading: !state.postsLoading,
      };

    case INCREMENT_SKIP:
      return {
        ...state,
        skip: state.posts.length,
      };
    case DISABLE_POSTS_FETCHING:
      return {
        ...state,
        fetching: false,
      };
    case ENABLE_POSTS_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case ENABLE_PUBLISH_FLAG:
      return {
        ...state,
        publishFlag: true,
      };
    case DISABLE_PUBLISH_FLAG:
      return {
        ...state,
        publishFlag: false,
      };
    case RESET_POST:
      return initialState;
    default:
      return state;
  }
}
