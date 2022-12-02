import { ActionTypes } from "@mui/base";
import * as types from "./actionType";
const initialState = {
  users: [],
  post: [],
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.DELETE_USERS:
    case types.DELETE_POST:
    case types.ADD_POST:
    case types.ADD_USERS:
    case types.EDIT_USERS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
