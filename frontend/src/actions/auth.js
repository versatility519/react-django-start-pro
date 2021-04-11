import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

//check to token and load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  //making axios get request
  axios
    .get("/api/auth/user", tokenConfig(getState)) //tokenConfig is a function to carryalong the user authToken in the header['Authorization']
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};





//LOGIN USER
export const login = (username, password) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ username, password });

  //making axios get request
  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};




//REGISTER USER
export const register = ({ username, email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ username, email, password });

  //making axios get request
  axios
    .post("/api/auth/register", body, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
//REGISTER ENDS




//LOGOUT USER
export const logout = () => (dispatch, getState) => {
  //making axios get request
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};





//Setup config with token stored in the localStorage in the browser
export const tokenConfig = (getState) => {
  //Get token from the current state
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
