import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ASSIGN_ROLE,
    GET_USER_ERROR,
    CLEAR_LOGIN_ERROR
    } from './actionTypes'
import axios from "axios";
export const loginUser =  (data) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
      axios
        .post("http://localhost:8000/users/api/token/", data, config)
        .then((res) =>{
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: LOGIN_FAIL,
          });
        });
  };

export const getUser = (access_token) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
  };
    axios
      .get("http://localhost:8000/users/get_user/", config)
      .then((res) =>{
        dispatch({
          type: ASSIGN_ROLE,
          payload: res.data,
        })
      }
      )
      .catch((err) => {
        dispatch({
          type: GET_USER_ERROR,
        });
      });
  };

  export const clear_login_error = () => (dispatch) => {
    // Headers
          dispatch({
            type: CLEAR_LOGIN_ERROR
          })
    };