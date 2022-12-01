import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

export const loadUsers = () => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .get(`${process.env.REACT_APP_NOT_SECRET_CODE}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getUsers(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
