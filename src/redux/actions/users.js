import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERRORS,
  CLEAR_GET_ALL_USERS,
  LOGOUT
    } from './actionTypes'
import axios from "axios";
import{
    CREATEATTENDANT,
    CREATEMANAGER,
    GETALLUSERSURL,    
} from '../../Constants';
export const CreateManager =  (access_token,data) => (dispatch) => {
    // Headers
    const formData = new FormData();
    formData.append('id_number',data["id_number"])
    formData.append('user_name',data["user_name"])
    formData.append('first_name',data["first_name"])
    formData.append('middle_name',data["middle_name"])
    formData.append('last_name',data["last_name"])
    formData.append('password',data["password"])
    formData.append('email',data["email"])
    formData.append('file_upload',data["file_upload"])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .post(CREATEMANAGER, formData, config)
        .then((res) =>{
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: CREATE_USER_ERROR,
          });
        });
  };
  export const CreateAttendant =  (access_token,data) => (dispatch) => {
    // Headers
    const formData = new FormData();
    formData.append('id_number',data["id_number"])
    formData.append('user_name',data["user_name"])
    formData.append('first_name',data["first_name"])
    formData.append('middle_name',data["middle_name"])
    formData.append('last_name',data["last_name"])
    formData.append('password',data["password"])
    formData.append('email',data["email"])
    formData.append('file_upload',data["file_upload"])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .post(CREATEATTENDANT, formData, config)
        .then((res) =>{
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: CREATE_USER_ERROR,
          });
        });
  };
  export const getallUsers =  (access_token) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .get(GETALLUSERSURL, config)
        .then((res) =>{
          dispatch({
            type: GET_ALL_USERS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          if (err.response.status===401){
            dispatch({
              type:LOGOUT
            })

          }else{
          dispatch({
            type: GET_ALL_USERS_ERRORS,
          });}
        });
  };
  export const clearErrors=()=>(dispatch)=>{
    dispatch({
      type: CLEAR_GET_ALL_USERS
    })
  }