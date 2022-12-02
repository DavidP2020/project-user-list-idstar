import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const getPost = (post) => ({
  type: types.GET_POST,
  payload: post,
});

const userAdded = () => ({
  type: types.ADD_USERS,
});
const userUpdated = () => ({
  type: types.EDIT_USERS,
});

const getOneUsers = (users) => ({
  type: types.GET_SINGLE_USERS,
  payload: users,
});

const removeUsers = () => ({
  type: types.DELETE_USERS,
});

const removePost = () => ({
  type: types.DELETE_POST,
});

const postAdded = () => ({
  type: types.ADD_POST,
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

export const deleteUsers = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_NOT_SECRET_CODE}/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(removeUsers());
        dispatch(loadUsers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUsers = (user) => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .post(`${process.env.REACT_APP_NOT_SECRET_CODE}`, user)
      .then((res) => {
        console.log(res.data);
        dispatch(userAdded(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUsers = (user, id) => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .put(`${process.env.REACT_APP_NOT_SECRET_CODE}/${id}`, user)
      .then((res) => {
        console.log(res.data);
        dispatch(userUpdated(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSingleUsers = (id) => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .get(`${process.env.REACT_APP_NOT_SECRET_CODE}/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getOneUsers(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loadPost = () => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .get(`${process.env.REACT_APP_POST_CODE}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getPost(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePost = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_POST_CODE}/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(removePost());
        dispatch(loadPost());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addPost = (post) => {
  return function (dispatch) {
    // console.log(`${process.env.REACT_APP_NOT_SECRET_CODE}`);
    axios
      .post(`${process.env.REACT_APP_POST_CODE}`, post)
      .then((res) => {
        console.log(res.data);
        dispatch(postAdded(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
