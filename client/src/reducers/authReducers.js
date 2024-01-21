import {
  SET_CURRENT_USER,
  TOGGLE_USER_LOADING,
  TOGGLE_SIDE_DRAWER,
} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
  sideDrawerOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case TOGGLE_SIDE_DRAWER:
      return {
        ...state,
        sideDrawerOpen: !state.sideDrawerOpen,
      };
    case TOGGLE_USER_LOADING:
      return {
        ...state,
        userLoading: !state.userLoading,
      };
    default:
      return state;
  }
}
