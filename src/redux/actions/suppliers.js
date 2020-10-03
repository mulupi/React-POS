import {
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_ERROR,
    GET_ALL_SUPPLIERS,
    GET_ALL_SUPPLIERS_ERROR,
    CLEAR_GET_ALL_SUPPLIERS,
    LOGOUT
      } from './actionTypes'
  import axios from "axios";
  import{
    CREATESUPPLIER  
  } from '../../Constants';
  export const CreateSupplier =  (access_token,data) => (dispatch) => {
      // Headers
      const formData = new FormData();
      formData.append('supplier_name',data["supplier_name"])
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .post(CREATESUPPLIER, formData, config)
          .then((res) =>{
            dispatch({
              type: CREATE_SUPPLIER_SUCCESS,
              payload: res.data,
            })
          }
          )
          .catch((err) => {
            dispatch({
              type: CREATE_SUPPLIER_ERROR,
            });
          });
    };
    export const getallSuppliers =  (access_token) => (dispatch) => {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .get(CREATESUPPLIER, config)
          .then((res) =>{
            dispatch({
              type: GET_ALL_SUPPLIERS,
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
              type: GET_ALL_SUPPLIERS_ERROR,
            });}
          });
    };
    export const clearErrors=()=>(dispatch)=>{
      dispatch({
        type: CLEAR_GET_ALL_SUPPLIERS
      })
    }