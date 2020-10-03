import {
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_ERROR,
    GET_ALL_BRANDS,
    GET_ALL_BRANDS_ERROR,
    CLEAR_GET_ALL_BIKES,

    CREATE_BODY_TYPE_SUCCESS,
    CREATE_BODY_TYPE_ERROR,
    GET_ALL_BODY_TYPES,
    GET_ALL_BODY_TYPES_ERROR,

    CREATE_MODEL_ERROR,
    CREATE_MODEL_SUCCESS,
    GET_ALL_MODELS_ERROR,
    GET_ALL_MODELS,

    LOGOUT
      } from './actionTypes'
  import axios from "axios";
  import{
    BRANDS,
    BODY,
    MODELS

  } from '../../Constants';
  export const CreateBrand =  (access_token,data) => (dispatch) => {
      // Headers
      const formData = new FormData();
      formData.append('brand_name',data["brand_name"])
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .post(BRANDS, formData, config)
          .then((res) =>{
            dispatch({
              type: CREATE_BRAND_SUCCESS,
              payload: res.data,
            })
          }
          )
          .catch((err) => {
            dispatch({
              type: CREATE_BRAND_ERROR,
            });
          });
    };
    export const getallBrands =  (access_token) => (dispatch) => {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .get(BRANDS, config)
          .then((res) =>{
            dispatch({
              type: GET_ALL_BRANDS,
              payload: res.data.data,
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
              type: GET_ALL_BRANDS_ERROR,
            });}
          });
    };
    export const CreateBodyTypes =  (access_token,data) => (dispatch) => {
      // Headers
      const formData = new FormData();
      formData.append('body_name',data["body_name"])
      formData.append('image',data["file_upload"])
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .post(BODY, formData, config)
          .then((res) =>{
            dispatch({
              type: CREATE_BODY_TYPE_SUCCESS,
              payload: res.data,
            })
          }
          )
          .catch((err) => {
            dispatch({
              type: CREATE_BODY_TYPE_ERROR,
            });
          });
    };
    export const getallBodyTypes =  (access_token) => (dispatch) => {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .get(BODY, config)
          .then((res) =>{
            dispatch({
              type: GET_ALL_BODY_TYPES,
              payload: res.data.data,
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
              type: GET_ALL_BODY_TYPES_ERROR,
            });}
          });
    };
    export const CreateModel =  (access_token,data) => (dispatch) => {
      // Headers
      const formData = new FormData();
      formData.append('brand_name',data["brand_name"])
      formData.append('model_name',data["model_name"])
      formData.append('body_type',data["body_type"])
      formData.append('image',data["file_upload"])
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .post(MODELS, formData, config)
          .then((res) =>{
            dispatch({
              type: CREATE_MODEL_SUCCESS,
              payload: res.data,
            })
          }
          )
          .catch((err) => {
            dispatch({
              type: CREATE_MODEL_ERROR,
            });
          });
    };
    export const getallModels =  (access_token) => (dispatch) => {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .get(MODELS, config)
          .then((res) =>{
            dispatch({
              type: GET_ALL_MODELS,
              payload: res.data.data,
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
              type: GET_ALL_MODELS_ERROR,
            });}
          });
    };
    export const clearErrors=()=>(dispatch)=>{
      dispatch({
        type: CLEAR_GET_ALL_BIKES
      })
    }